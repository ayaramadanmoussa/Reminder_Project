import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../../../../services/medicine';
import { NotificationService } from '../../../../../services/notification';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicine-list',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './medicine-list.html',
  styleUrl: './medicine-list.css',
})
export class MedicineListComponent {
  // medicineService injected here to use it 
  private medicineService = inject(MedicineService);
  private notificationService = inject(NotificationService);

    private saveUpdatedMedicine(med: any) {
    const currentMeds = this.medicineService.getMedicines();
    const index = currentMeds.findIndex(m => m.name === med.name);
    if (index !== -1) {
      currentMeds[index] = med;
      const user = this.medicineService['userService'].getCurrentUser();
      if (user) {
        localStorage.setItem(`medicines_${user.id}`, JSON.stringify(currentMeds));
      }
    }
  }
  checkAndResetDailyDoses(med: any) {
    if (!med) return;
    const today = new Date().toDateString();

    if (med.lastTakenDate && med.lastTakenDate !== today) {
      med.dosesTakenToday = 0;
      med.dosesMissedToday = 0;
      med.status = 'Active';
      med.lastTakenDate = today;

      this.saveUpdatedMedicine(med);
    }
  }

  get categories() {
    return this.medicineService.getCategories();
  }

  get medicines(): any[] {
    return this.medicineService.getMedicines();
  }

  get todayDate(): string {
    return new Date().toDateString();
  }

  getDailyTarget(frequency: string): number {
    if (!frequency) return 1;
    if (frequency.includes('2x')) return 2;
    if (frequency.includes('3x')) return 3;
    return 1;
  }

  calculateNextDose(frequency: string): string {
    const hoursToAdd = frequency?.includes('3x') ? 8 : frequency?.includes('2x') ? 12 : 24;
    const nextTime = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000);
    
    let hours = nextTime.getHours();
    const minutes = nextTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  markAsTaken(med: any) {
  if (!med) return;

  const target = this.getDailyTarget(med.frequency);
  const currentTotal = (med.dosesTakenToday || 0) + (med.dosesMissedToday || 0);

  // no more doses today
  if (currentTotal >= target) return;

  med.dosesTakenToday = (med.dosesTakenToday || 0) + 1;
  med.lastTakenDate = new Date().toDateString();

  //target complete
  if ((med.dosesTakenToday + (med.dosesMissedToday || 0)) >= target) {
    med.status = 'Completed';
  }

  this.medicineService.logToHistory(med, 'Taken');
  this.saveUpdatedMedicine(med);
}

markAsMissed(med: any) {
  if (!med) return;

  const target = this.getDailyTarget(med.frequency);
  const currentTotal = (med.dosesTakenToday || 0) + (med.dosesMissedToday || 0);

  if (currentTotal >= target) return;

  med.dosesMissedToday = (med.dosesMissedToday || 0) + 1;

  if (((med.dosesTakenToday || 0) + med.dosesMissedToday) >= target) {
    med.status = 'Completed';
  }

  this.medicineService.logToHistory(med, 'Missed');
  this.saveUpdatedMedicine(med);
  this.closeDetails();
}

  deleteMedicine(med: any) {
    if (!med || !confirm(`Are you sure you want to delete ${med.name}?`)) return;

    const user = this.medicineService['userService'].getCurrentUser();
    if (!user) return;

    let currentMeds = this.medicineService.getMedicines();
    currentMeds = currentMeds.filter(m => m.name !== med.name);
    localStorage.setItem(`medicines_${user.id}`, JSON.stringify(currentMeds));

    this.closeDetails();
  }



  selectedCategory: string = 'All';
  selectedStatus: string = 'All';
  selectedFrequency: string = 'All';
  searchQuery: string = '';
  selectedMedicine: any = null;

  getMedicineStatus(med: any): string {
  if (!med) return 'Active';

  const target = this.getDailyTarget(med.frequency);
  const taken = med.dosesTakenToday || 0;
  const missed = med.dosesMissedToday || 0;

  if (taken >= target) {
    return 'Completed';
  }

  if (missed > 0) {
    return 'Missed';
  }

  return med.status || 'Active';
}

  skipDose(med: any) {
    this.medicineService.logToHistory(med, 'Skipped');
  }


  openDetails(med: any) {
    this.selectedMedicine = med;
  }

  closeDetails() {
    this.selectedMedicine = null;
  }


  getFilteredMedicines(): any[] {
    return this.medicines.filter(med => {
      // reset dosage every day 
      this.checkAndResetDailyDoses(med);

      const matchesSearch = !this.searchQuery ||
        med.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCategory = this.selectedCategory === 'All' || med.category.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchesStatus = this.selectedStatus === 'All' || this.getMedicineStatus(med) === this.selectedStatus;
      const matchesFrequency = this.selectedFrequency === 'All' || med.frequency === this.selectedFrequency;

      return matchesSearch && matchesCategory && matchesStatus && matchesFrequency;
    });
  }

  clearFilters() {
    this.selectedCategory = 'All';
    this.selectedStatus = 'All';
    this.selectedFrequency = 'All';
    this.searchQuery = '';
  }
}



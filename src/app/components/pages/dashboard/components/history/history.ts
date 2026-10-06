import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineService, HistoryRecord } from '../../../../../services/medicine';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent {

  private medicineService = inject(MedicineService);


  selectedPeriod: 'week' | 'month' | 'all' = 'week';


  get allHistory(): HistoryRecord[] {
    return this.medicineService.getHistory();
  }

  get filteredHistory(): HistoryRecord[] {
    const now = new Date();
    return this.allHistory.filter(record => {
      if (this.selectedPeriod === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return record.date >= weekAgo;
      } else if (this.selectedPeriod === 'month') {
        const monthAgo = new Date(now);
        monthAgo.setMonth(now.getMonth() - 1);
        return record.date >= monthAgo;
      }
      return true;
    });
  }

  // ======== إحصائيات الـ Stats Cards ========
  get dosesTaken(): number {
    return this.filteredHistory.filter(r => r.status === 'Taken').length;
  }

  get dosesMissed(): number {
    return this.filteredHistory.filter(r => r.status === 'Missed').length;
  }

  get adherenceRate(): number {
    const total = this.filteredHistory.length;
    if (total === 0) return 0;
    return Math.round((this.dosesTaken / total) * 100);
  }

  get dayStreak(): number {
    let streak = 0;
    const sorted = [...this.allHistory].sort((a, b) => b.date.getTime() - a.date.getTime());
    for (const record of sorted) {
      if (record.status === 'Taken') streak++;
      else break;
    }
    return streak;
  }


  setPeriod(period: 'week' | 'month' | 'all') {
    this.selectedPeriod = period;
  }
}

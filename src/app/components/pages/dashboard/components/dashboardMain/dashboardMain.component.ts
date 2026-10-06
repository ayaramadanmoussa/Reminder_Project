import { Component, inject } from "@angular/core";
import { MedicineService } from "../../../../../services/medicine";
import { User, UserService } from "../../../../../services/user";
import { SlicePipe } from "@angular/common";
import { RouterLink } from "@angular/router";



@Component({
    selector: "app-dashboardMainPage",
    standalone: true,
    imports: [SlicePipe, RouterLink],
    templateUrl: "dashboardMain.component.html",
    styleUrl: "dashboardMain.component.css"
})

export class DashboardMainPageComponent {
    private userService = inject(UserService);
    private medicineService = inject(MedicineService);

    user = this.userService.getCurrentUser() ?? { id: 0, name: "guest" };
    medicines = this.medicineService.getMedicines();
    totalMedicines = this.medicines.length;
    totalCategories = this.medicineService.getCategories().length;
    medicineAdded = this.medicineService.medicinesAddRecently;
    categoryAdded = this.medicineService.catogoryAddedLatest;

    // addMedi(med: any) {
    //     med.status = 'Completed';
    //     const index = this.medicines.findIndex((m) => m = med);
    //     this.medicines.splice(index, 1);
    //     this.medicineService.saveMedicines(this.medicines, this.user.id);
    //     this.medicineService.addMedicine(med);
    // }

    getAllAcitve() {
        const activeMedi = this.medicines.filter((c) => c.status === 'Active');
        return activeMedi;
    }
}
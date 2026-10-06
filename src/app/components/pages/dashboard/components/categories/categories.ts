import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicineService, Category } from '../../../../../services/medicine';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent {


  private medicineService = inject(MedicineService);

  searchQuery = '';

  showForm = false;
  isEditing = false;
  editingIndex = -1;

  categoryName = '';

  get categories(): Category[] {
    return this.medicineService.getCategories();
  }

  get filteredCategories(): Category[] {
    if (!this.searchQuery) {
      return this.categories;
    }
    return this.categories.filter(c => c.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  openAddForm() {
    this.showForm = true;
    this.isEditing = false;
    this.categoryName = '';
  }

  openEditForm(index: number) {
    this.showForm = true;
    this.isEditing = true;
    this.editingIndex = index;
    this.categoryName = this.filteredCategories[index].name;
  }

  closeForm() {
    this.showForm = false;
  }

  saveCategory() {
    if (!this.categoryName) {
      alert('Please fill in the category name.');
      return;
    }

    if (this.isEditing) {
      const realIndex = this.categories.indexOf(this.filteredCategories[this.editingIndex]);
      this.medicineService.editCategory(realIndex, this.categoryName);
    } else {
      this.medicineService.addCategory(this.categoryName);
    }

    this.closeForm();
  }

  deleteCategory(index: number, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete?')) {
      const realIndex = this.categories.indexOf(this.filteredCategories[index]);
      this.medicineService.deleteCategory(realIndex);
    }
  }
}

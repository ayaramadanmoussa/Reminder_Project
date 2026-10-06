import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-component.html',
  styleUrl: './services-component.css',
})
export class ServicesComponent {

  services = [
    {
      title: 'Medication Management',
      description:
        'Organize your prescriptions by category, dosage and frequency, and get reminders.',
      icon: 'fa-solid fa-capsules',
      color: 'green',
    },
    {
      title: 'Smart Notifications',
      description:
        'Get notified before doses, appointments and refills.',
      icon: 'fa-regular fa-bell',
      color: 'yellow',
    },
    {
      title: 'Doctor Directory',
      description:
        'Search and filter doctors, hospitals and specialties.',
      icon: 'fa-solid fa-user-doctor',
      color: 'blue',
    },
    {
      title: 'Emergency Access',
      description:
        'One tap access to emergency numbers and nearby hospitals.',
      icon: 'fa-solid fa-truck-medical',
      color: 'red',
    },
    {
      title: 'History & Insights',
      description:
        'View medication history, reports and medical notes.',
      icon: 'fa-regular fa-clipboard',
      color: 'orange',
    },
    {
      title: 'Custom Categories',
      description:
        'Group medicines into categories that fit your own needs.',
      icon: 'fa-solid fa-table-cells-large',
      color: 'purple',
    },
  ];

}

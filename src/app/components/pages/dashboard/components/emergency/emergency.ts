// src/app/emergency/emergency.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {inject} from '@angular/core';
import { UserService } from '../../../../../services/user';


@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emergency.html',
  styleUrl: './emergency.css'
})
export class Emergency {

//Emergency numbers
  primaryNumber = '123';

  emergencyNumbers = [
    {
      icon: 'bi-telephone-fill',
      label: 'Ambulance',
      number: '123',
      type: 'phone'
    },
    {
      icon: 'bi-shield-fill',
      label: 'Police',
      number: '122',
      type: 'police'
    },
    {
      icon: 'bi-fire',
      label: 'Fire Department',
      number: '180',
      type: 'fire'
    }
  ];


private userService = inject(UserService);

get emergencyContacts() {
  return this.userService.getEmergencyContacts();
}

  

  copiedId: number | null = null;

  callNumber(phone: string, id: number): void {
    this.copiedId = id;
    navigator.clipboard.writeText(phone).catch(error => {
      console.error('Failed to copy number:', error);
    });

    setTimeout(() => {
      this.copiedId = null;
    }, 2000);
  }

  manageContacts(): void {
    console.log('Manage Contacts clicked');
    
  }
 
  

}
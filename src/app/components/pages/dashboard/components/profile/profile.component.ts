import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../../../services/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export interface EmergencyContact {
  contactName: string;
  relationship: string;
  phoneNumber: string;
  active: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.contacts = this.userService.getEmergencyContacts();
  }

  getUserName() {
    if (this.user) {
      return this.user.name;
    } else {
      return "guest";
    }
  }

  contacts: EmergencyContact[] = [];

  contactName: string = '';
  relationship: string = '';
  phoneNumber: string = '';
  active: boolean = false;

  editIndex: number = -1;

  addOrUpdateContact() {

    if (
      this.contactName.trim() === '' ||
      this.relationship.trim() === '' ||
      this.phoneNumber.trim() === ''
    ) {
      alert('Please Fill All Fields');
      return;
    }

    const contact: EmergencyContact = {
      contactName: this.contactName,
      relationship: this.relationship,
      phoneNumber: this.phoneNumber,
      active: this.active
    };

    if (this.editIndex === -1) {

      this.contacts.push(contact);

    } else {

      this.contacts[this.editIndex] = contact;
      this.editIndex = -1;

    }

    this.userService.saveEmergencyContacts(this.contacts);


    this.clearInputs();

  }

  clearInputs() {

    this.contactName = '';
    this.relationship = '';
    this.phoneNumber = '';
    this.active = false;

  }

  deleteContact(index: number) {

    this.contacts.splice(index, 1);
    this.userService.saveEmergencyContacts(this.contacts);
  }


  updateContact(index: number) {

    this.contactName = this.contacts[index].contactName;
    this.relationship = this.contacts[index].relationship;
    this.phoneNumber = this.contacts[index].phoneNumber;
    this.active = this.contacts[index].active;

    this.editIndex = index;

  }
}
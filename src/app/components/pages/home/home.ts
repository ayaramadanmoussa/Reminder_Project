import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hero } from './hero/hero';
import { Features } from './features/features';
import { Cta } from './cta/cta';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Hero,
    Features,
    Cta
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home { }
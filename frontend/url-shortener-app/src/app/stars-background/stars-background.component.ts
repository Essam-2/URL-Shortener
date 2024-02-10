import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stars-background',
  standalone: true,
  imports: [NgFor],
  templateUrl: './stars-background.component.html',
  styleUrl: './stars-background.component.scss',
})
export class StarsBackgroundComponent {
  stars: number[] = Array(20).fill(0);
}

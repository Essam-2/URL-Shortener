import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-pop',
  standalone: true,
  imports: [NgIf],
  templateUrl: './success-pop.component.html',
  styleUrl: './success-pop.component.css',
})
export class SuccessPopComponent {
  @Input() successMessage: string = '';
}

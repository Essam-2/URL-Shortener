import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-pop',
  standalone: true,
  imports: [],
  templateUrl: './error-pop.component.html',
  styleUrl: './error-pop.component.css',
})
export class ErrorPopComponent {
  @Input() errorMessage: string = '';
}

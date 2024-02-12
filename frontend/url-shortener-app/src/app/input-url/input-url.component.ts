import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { SuccessPopComponent } from '../success-pop/success-pop.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-input-url',
  standalone: true,
  imports: [FormsModule, HttpClientModule, SuccessPopComponent, NgIf],
  templateUrl: './input-url.component.html',
  styleUrl: './input-url.component.css',
})
export class InputUrlComponent {
  urlValue: string = '';

  constructor(private Http: HttpService) {}
  success: boolean = false;

  @Output() urlAdded: EventEmitter<any> = new EventEmitter<any>();

  shortUrl() {
    try {
      if (this.urlValue) {
        this.Http.shortUrl(this.urlValue);
        this.urlValue = '';
        this.urlAdded.emit();
        this.success = true;
      }
    } catch (error) {
      this.success = false;
    } finally {
      setTimeout(() => {
        this.success = false;
      }, 2000);
    }
  }
}

import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { SuccessPopComponent } from '../success-pop/success-pop.component';
import { NgIf } from '@angular/common';
import { ErrorPopComponent } from '../error-pop/error-pop.component';

@Component({
  selector: 'app-input-url',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    SuccessPopComponent,
    NgIf,
    ErrorPopComponent,
  ],
  templateUrl: './input-url.component.html',
  styleUrl: './input-url.component.css',
})
export class InputUrlComponent {
  urlValue: string = '';

  constructor(private Http: HttpService) {}
  success: boolean = false;
  successMessage: string = '';
  error: boolean = false;
  errorMessage: string = '';

  @Output() urlAdded: EventEmitter<any> = new EventEmitter<any>();

  shortUrl() {
    try {
      if (!this.urlValue) {
        this.error = true;
        this.errorMessage = 'Write a correct URL';
        return;
      }
      this.Http.shortUrl(this.urlValue);
      this.urlValue = '';
      this.urlAdded.emit();
      this.success = true;
      this.successMessage = 'Your URL has been shortened';
    } catch (error) {
      this.success = false;
      this.error = true;
      this.errorMessage = 'Something Went Wrong';
    } finally {
      setTimeout(() => {
        this.success = false;
        this.error = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
    }
  }
}

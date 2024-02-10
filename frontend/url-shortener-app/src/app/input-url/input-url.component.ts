import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-input-url',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './input-url.component.html',
  styleUrl: './input-url.component.css',
})
export class InputUrlComponent {
  urlValue: string = '';

  constructor(private Http: HttpService) {}

  @Output() urlAdded: EventEmitter<any> = new EventEmitter<any>();

  shortUrl() {
    this.Http.shortUrl(this.urlValue);
    this.urlValue = '';
    this.urlAdded.emit();
  }
}

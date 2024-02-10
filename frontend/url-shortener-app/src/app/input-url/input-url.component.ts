import { Component, Inject } from '@angular/core';
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

  shortUrl() {
    this.Http.shortUrl(this.urlValue);
    this.urlValue = '';
  }
}

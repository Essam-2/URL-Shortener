import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StarsBackgroundComponent } from './stars-background/stars-background.component';
import { InputUrlComponent } from './input-url/input-url.component';
import { UrlsTableComponent } from './urls-table/urls-table.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    StarsBackgroundComponent,
    InputUrlComponent,
    UrlsTableComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'url-shortener-app';
}

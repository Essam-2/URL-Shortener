import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-urls-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './urls-table.component.html',
  styleUrl: './urls-table.component.css',
})
export class UrlsTableComponent implements OnInit {
  constructor(private Http: HttpService) {}

  shortUrls: any[] = [];

  ngOnInit() {
    this.getAllUrls();
    this.Http.urlAdded.subscribe(() => {
      this.getAllUrls();
    });
  }

  getAllUrls() {
    this.Http.getShortUrls().subscribe(
      (response) => {
        this.shortUrls = response.shortUrls;
        console.log(this.shortUrls);
      },
      (error: any) => {
        console.error('Error fetching short URLs:', error);
      }
    );
  }
}

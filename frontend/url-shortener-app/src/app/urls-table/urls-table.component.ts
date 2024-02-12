import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { NgFor, NgIf } from '@angular/common';
import { ErrorPopComponent } from '../error-pop/error-pop.component';
import { SuccessPopComponent } from '../success-pop/success-pop.component';

@Component({
  selector: 'app-urls-table',
  standalone: true,
  imports: [NgFor, ErrorPopComponent, NgIf, SuccessPopComponent],
  templateUrl: './urls-table.component.html',
  styleUrl: './urls-table.component.css',
})
export class UrlsTableComponent implements OnInit {
  constructor(private Http: HttpService) {}

  shortUrls: any[] = [];
  error: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  successMessage: string = '';

  ngOnInit() {
    this.getAllUrls();
    this.Http.urlAdded.subscribe(() => {
      this.getAllUrls();
    });
    this.Http.urlDeleted.subscribe(() => {
      this.getAllUrls();
    });
  }

  getAllUrls() {
    try {
      this.Http.getShortUrls().subscribe(
        (response) => {
          this.shortUrls = response.shortUrls;
          // console.log(this.shortUrls);
        },
        (error: any) => {
          console.error('Error fetching short URLs:', error);
        }
      );
    } catch (error) {
      this.error = true;
      this.errorMessage = 'Something Went Wrong!';
    } finally {
      setTimeout(() => {
        this.error = false;
        this.errorMessage = '';
      }, 2000);
    }
  }

  onShortUrlClick(): void {
    this.getAllUrls();
  }

  deleteUrl(id: string) {
    try {
      this.Http.deleteUrl(id).subscribe(
        () => {
          console.log('URL deleted successfully');
        },
        (error) => {
          console.error('Error deleting URL:', error);
        }
      );
      this.success = true;
      this.successMessage = 'Your URL has been deleted!';
    } catch (error) {
      this.error = true;
      this.success = false;
      this.errorMessage = 'Something Went Wrong!';
    } finally {
      setTimeout(() => {
        this.error = false;
        this.success = false;
        this.errorMessage = '';
        this.successMessage = '';
      }, 2000);
    }
  }
}

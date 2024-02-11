import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  urlAdded: EventEmitter<void> = new EventEmitter<void>();

  shortUrl(url: string) {
    this.http
      .post(`${this.apiUrl}/shortUrl`, { fullUrl: url })
      .subscribe((response) => {
        this.urlAdded.emit();
      });
  }

  getShortUrls(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:5000';
  private clicksUpdated = new Subject<void>();

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

  getClicksUpdated(): Observable<void> {
    return this.clicksUpdated.asObservable();
  }

  emitClicksUpdated(): void {
    this.clicksUpdated.next();
  }
}

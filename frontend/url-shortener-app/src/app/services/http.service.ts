import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  urlAdded: EventEmitter<void> = new EventEmitter<void>();

  shortUrl(url: string) {
    this.http
      .post('http://localhost:5000/shortUrl', { fullUrl: url })
      .subscribe((response) => {
        this.urlAdded.emit();
      });
  }

  getShortUrls(): Observable<any> {
    return this.http.get('http://localhost:5000/');
  }
}

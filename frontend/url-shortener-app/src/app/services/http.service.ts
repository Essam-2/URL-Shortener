import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  shortUrl(url: string) {
    this.http
      .post('http://localhost:5000/shortUrl', { fullUrl: url })
      .subscribe((response) => {
        console.log(response);
      });
  }
}

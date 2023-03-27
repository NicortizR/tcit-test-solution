import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime } from 'rxjs';

@Injectable()
export class ApiCallComponent {
  constructor(private httpClient: HttpClient) {}

  postApi() {
    let response: any;
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.httpClient.post(url, '').subscribe((res) => {
      console.log('res: ', res);
    });
  }
}

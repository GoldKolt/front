import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Request} from '../model/request';

@Injectable()
export class RequestService {
  url = 'https://spp-bsuir.herokuapp.com/request/';

  constructor(private http: HttpClient) { }

  getAll(token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<Request[]>(this.url, options);
  }

  get(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<Request>(this.url + id, options);
  }

  delete(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.delete<Request>(this.url + id, options);
  }

  post(request: Request, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<Request>(this.url, request, options);
  }

  put(request: Request, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put<Request>(this.url, request, options);
  }
}

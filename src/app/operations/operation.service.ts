import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Operation} from '../model/operation';

@Injectable()
export class OperationService {
  url = 'https://spp-bsuir.herokuapp.com/operation/';

  constructor(private http: HttpClient) { }

  getAll(token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<Operation[]>(this.url, options);
  }

  get(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<Operation>(this.url + id, options);
  }

  delete(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.delete<Operation>(this.url + id, options);
  }

  post(operation: Operation, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<Operation>(this.url, operation, options);
  }

  put(operation: Operation, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put<Operation>(this.url, operation, options);
  }
}

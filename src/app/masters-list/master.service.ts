import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

const url = 'https://spp-bsuir.herokuapp.com/master/';

@Injectable()
export class MasterService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(url);
  }

  post() {

  }
}

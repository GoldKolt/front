import { Injectable } from '@angular/core';
import {Client} from '../model/client';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ClientService {
  url = 'https://spp-bsuir.herokuapp.com/client/';

  constructor(private http: HttpClient) { }

  getAll(token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<Client[]>(this.url, options);
  }

  get(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<Client>(this.url + id, options);
  }

  delete(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.delete<Client>(this.url + id, options);
  }

  post(client: Client, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<Client>(this.url, client, options);
  }

  put(client: Client, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put<Client>(this.url, client, options);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SparePart} from '../model/spare-part';

@Injectable()
export class SparePartService {
  url = 'https://spp-bsuir.herokuapp.com/sparePart/';

  constructor(private http: HttpClient) { }

  getAll(token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<SparePart[]>(this.url, options);
  }

  get(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<SparePart>(this.url + id, options);
  }

  delete(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.delete<SparePart>(this.url + id, options);
  }

  post(sparePart: SparePart, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<SparePart>(this.url, sparePart, options);
  }

  put(sparePart: SparePart, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put<SparePart>(this.url, sparePart, options);
  }
}

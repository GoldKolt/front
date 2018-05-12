import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TypeOperation} from '../model/type-operation';

@Injectable()
export class TypeOperationService {
  url = 'https://spp-bsuir.herokuapp.com/typeOperation/';
  editingType: TypeOperation;

  constructor(private http: HttpClient) { }

  getAll(token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<TypeOperation[]>(this.url, options);
  }

  get(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<TypeOperation>(this.url + id, options);
  }

  delete(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.delete<TypeOperation>(this.url + id, options);
  }

  post(typeOperation: TypeOperation, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<TypeOperation>(this.url, typeOperation, options);
  }

  put(typeOperation: TypeOperation, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put<TypeOperation>(this.url, typeOperation, options);
  }
}

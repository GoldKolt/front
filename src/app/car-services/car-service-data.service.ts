import { Injectable } from '@angular/core';
import {CarService} from '../model/carservice';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CarServiceDataService {
  url = 'https://spp-bsuir.herokuapp.com/carService/';

  constructor(private http: HttpClient) { }

  editingService: CarService;

  getAll() {
    return this.http.get<CarService[]>(this.url);
  }

  get(id: string) {
    return this.http.get<CarService>(this.url + id);
  }

  post(carService: CarService, token: string) {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<CarService>(this.url, carService, options);
  }

  delete(id: string, token: string) {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.delete<CarService>(this.url + id, options);
  }

  put(carService: CarService, token: string) {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put<CarService>(this.url, carService, options);
  }
}

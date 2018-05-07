import { Injectable } from '@angular/core';
import {CarService} from '../model/carservice';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CarServiceDataService {
  url = 'https://spp-bsuir.herokuapp.com/carService/';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CarService[]>(this.url);
  }

  get(id: string) {
    return this.http.get<CarService>(this.url + id);
  }

  post(carService: CarService) {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<CarService>(this.url, options);
  }

  delete(id: string) {
    return this.http.delete<CarService>(this.url + id);
  }

  put(carService: CarService) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put<CarService>(this.url, options);
  }
}

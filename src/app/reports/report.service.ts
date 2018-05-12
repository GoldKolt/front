import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) { }

  getCarServiceReport(name: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/carServices?reportType=' + name;
    return this.http.get(url, {responseType: 'blob'});
  }

  getClientReport(name: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/clients?reportType=' + name;
    return this.http.get(url, {responseType: 'blob'});
  }

  getMasterReport(name: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/masters?reportType=' + name;
    return this.http.get(url, {responseType: 'blob'});
  }

  getRequestReport(name: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/requests?reportType=' + name;
    return this.http.get(url, {responseType: 'blob'});
  }

  getSparePartReport(name: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/spareParts?reportType=' + name;
    return this.http.get(url, {responseType: 'blob'});
  }
}

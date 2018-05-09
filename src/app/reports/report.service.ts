import { Injectable } from '@angular/core';
import {Mail} from '../model/mail';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ReportService {

  constructor() { }

  getCarServiceReport(token: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/carServices';
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get(url, mail, options);
  }

  getClientReport(token: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/clients';
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get(url, mail, options);
  }

  getMasterReport(token: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/masters';
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get(url, mail, options);
  }

  getClientRequestReport(token: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/requests';
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get(url, mail, options);
  }

  getSparePartReport(token: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/report/spareParts';
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get(url, mail, options);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MailTemplate} from '../model/mail-template';
import {Mail} from '../model/mail';

@Injectable()
export class EmailService {
  url = 'https://spp-bsuir.herokuapp.com/template/';
  editingTemplate: MailTemplate;
  constructor(private http: HttpClient) { }

  send(mail: Mail, token: string = '') {
    const url = 'https://spp-bsuir.herokuapp.com/send';
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<Mail>(url, mail, options);
  }

  getAll(token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<MailTemplate[]>(this.url, options);
  }

  get(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.get<MailTemplate>(this.url + id, options);
  }

  delete(id: string, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Authorization': token
      })
    };
    return this.http.delete<MailTemplate>(this.url + id, options);
  }

  post(mailTemplate: MailTemplate, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post<MailTemplate>(this.url, mailTemplate, options);
  }

  put(mailTemplate: MailTemplate, token: string = '') {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.put<MailTemplate>(this.url, mailTemplate, options);
  }
}

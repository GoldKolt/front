import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';

@Injectable()
export class UserService {
  url = 'https://spp-bsuir.herokuapp.com/user/';

  constructor( private http: HttpClient ) { }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  searchUsers(term: string): Observable<User[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<User[]>(this.url, options);
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }

  loginUser(value: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': value
      })
    };
    return this.http.head(this.url, httpOptions);
  }
}

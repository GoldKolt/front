import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class UserService {
  url = 'https://spp-bsuir.herokuapp.com/user/';
  user: User;

  constructor( private http: HttpClient, private route: ActivatedRoute ) { }

  getUsers (token: string): Observable<User[]> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      withCredentials: true
    };
    return this.http.get<User[]>(this.url, options);
  }

  getUser(id: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      withCredentials: true
    };
    return this.http.get<User>(this.url + id, options);
  }

  postUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<User>(this.url, user, httpOptions);
  }

  findUser(users: User[], user: User): User {
    return users.find(value => value.email === user.email);
  }

  getCurrentUser(): User {
    // console.log(this.user);
    return this.user;
  }

  setCurrentUser(user) {
    this.user = user;
    // console.log(this.user);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';

@Injectable()
export class UserService {
  url = 'https://spp-bsuir.herokuapp.com/user/';
  user: User;

  constructor( private http: HttpClient ) { }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: string, token: string) {
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
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

  findUser( users: User[], email: string ): User {
    return users.find(value => value.email === email );
  }

  // loginUser(user: User) {
  //
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Authorization': token
  //     })
  //   };
  //   return this.http.get<User[]>( this.url, options ).subscribe(resp => {
  //     const foundUser = this.findUser(resp, user.email);
  //     if (foundUser) {
  //       const s = this.getUser(foundUser.id, token);
  //       if (s) { console.log(this.user); }
  //     }
  //   });
  // }
}

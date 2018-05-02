import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';

@Injectable()
export class AuthService {
  users: string[] = [
    '{"Login":"login1","Password":"pass123","Name":"name1","Surname":"surname1","Birthdate":"12.12.1222","Phone":"1231231"}',
    '{"Login":"login2","Password":"1234","Name":"name2","Surname":"surname2","Birthdate":"12.12.1252","Phone":"1112223"}',
    '{"Login":"login3","Password":"0000","Name":"name3","Surname":"surname3","Birthdate":"12.12.1522","Phone":"1212334"}'
  ];

  constructor( private http: HttpClient ) { }

  getUser(user: User): any {
    for (let index = 0; index < this.users.length; index++) {
      const element: User = JSON.parse(this.users[index]);
      if ((user.Login === element.Login) && (user.Password === element.Password)) {
        return JSON.parse(this.users[index]);
      }
    }
    return null;
  }

  postUser(data: User): void {
    this.users.push(JSON.stringify(data));
  }

  login(email: string, password: string): any {
    this.users.push(JSON.stringify({email, password}));
   // return this.http.post<UserProfileModel>('/api/login', {email, password});
  }
}

import { Injectable } from '@angular/core';
import { User } from '../model/user';
import {UserService} from '../users-list/user.service';

@Injectable()
export class AuthService {
  constructor( private userService: UserService ) { }

  getUser(user: User): any {
    this.userService.loginUser(btoa(user.email + ':' + user.password));
  }

  postUser(data: User): void {
    (JSON.stringify(data));
  }
}

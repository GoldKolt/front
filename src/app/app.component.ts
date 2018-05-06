import {Component, OnInit} from '@angular/core';
import {User} from './model/user';
import {CookieOptions, CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cars Repair Service';
  currentUser: User;

  constructor(private _cookieService: CookieService) { }

  ngOnInit() {
    this.currentUser = this.getCookie('user') as User;
  }

  getCookie(key: string) {
    return this._cookieService.getObject(key);
  }

  putCookie(key: string, obj: Object, opt?: CookieOptions): void {
    this._cookieService.putObject(key, obj, opt);
  }

  removeCookie(key: string, opt?: CookieOptions) {
    this._cookieService.remove(key, opt);
  }

  SignIn(): void {
    if (this.currentUser) {
      this.putCookie('user', this.currentUser);
    }
  }

  LogOut(): void {
    this.removeCookie('user');
    this.currentUser = null;
  }
}

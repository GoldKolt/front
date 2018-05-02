import {Component, OnInit} from '@angular/core';
import {SignInDialogComponent} from './signin-dialog/signin-dialog.component';
import {MatDialog} from '@angular/material';
import {User} from './model/user';
import {CookieOptions, CookieService} from 'ngx-cookie';


function _window(): any {
  return window;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Cars Repair Service';
  currentUser: User;

  constructor(public dialog: MatDialog, private _cookieService: CookieService) { }

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
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '300px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = result;
      if (this.currentUser) {
        this.putCookie('user', this.currentUser);
      }
    });
  }

  SignUp(): void {
    const dialogRef = this.dialog.open(SignInDialogComponent, {
      width: '300px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser = result;
    });
  }

  LogOut(): void {
    this.removeCookie('user');
    this.currentUser = null;
  }
}

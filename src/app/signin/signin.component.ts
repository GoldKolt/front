import {Component} from '@angular/core';
import {User} from '../model/user';
import {FormControl, Validators} from '@angular/forms';
import {SignErrorStateMatcher} from '../ErrorStateMatchers/sign-error-state-matcher';
import {UserService} from '../users-list/user.service';
import {CookieOptions, CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SignInComponent {
  user: User;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  matcher = new SignErrorStateMatcher();

  constructor (
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.user = new User();
  }

  getCookie(key: string) {
    return this.cookieService.getObject(key);
  }

  putCookie(key: string, obj: Object, opt?: CookieOptions): void {
    this.cookieService.putObject(key, obj, opt);
  }

  removeCookie(key: string, opt?: CookieOptions) {
    this.cookieService.remove(key, opt);
  }

  SignIn(): void {
    if (this.user && this.user.email && this.user.password) {
      const token = btoa(this.user.email + ':' + this.user.password);
      this.userService.getUsers().subscribe( resp => {
        const foundUser = this.userService.findUser(resp, this.user.email);
        if (foundUser) {
          this.userService.getUser(foundUser.id, token).subscribe(
            user => {
              this.user = user;
              this.putCookie('user', btoa(user.email + ':' + user.password));
            },
            (err) => {
              console.log(err);
              this.user.password = '';
            }
          );
        }
      });
    } else {
      this.user.password = '';
    }
  }

  SignUp(): void {
    if (this.user && this.user.email && this.user.password) {
      const returnedUser = this.userService.postUser(this.user).subscribe(
        user => {
          this.user = user;
          this.putCookie('user', btoa(user.email + ':' + user.password));
        },
        (err) => {
          console.log(err);
          this.user.password = '';
        }
      );
      if (returnedUser) {
      } else {
        this.user.password = '';
      }
    } else {
      this.user.password = '';
    }
  }
}

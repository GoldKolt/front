import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {FormControl, Validators} from '@angular/forms';
import {SignErrorStateMatcher} from '../ErrorStateMatchers/sign-error-state-matcher';
import {UserService} from '../users-list/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
  user: User = new User();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  matcher = new SignErrorStateMatcher();
  isMaster = false;

  constructor ( private userService: UserService, private router: Router ) { }

  ngOnInit() { }

  SignIn(): void {
    if (this.user && this.user.email && this.user.password) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.userService.getUsers(token).subscribe( resp => {
        this.user.roles = this.userService.findUser(resp, this.user).roles;
        this.userService.setCurrentUser(this.user);
        // console.log(this.user);
        this.router.navigate(['']);
      },
      (err: HttpErrorResponse) => {
        this.user.password = '';
      });
    } else {
      this.user.password = '';
    }
  }

  SignUp(): void {
    if (this.user && this.user.email && this.user.password) {
      if (this.isMaster) {
        this.user.roles.push('ROLE_MASTER');
      } else {
        this.user.roles.push('ROLE_CLIENT');
      }
      const returnedUser = this.userService.postUser(this.user).subscribe(
        user => {
          this.userService.setCurrentUser(user);
          this.user.roles = [];
          this.router.navigate(['']);
        },
        (err) => {
          this.user.password = '';
          this.user.roles = [];
        }
      );
      if (!returnedUser) {
        this.user.password = '';
      }
    } else {
      this.user.password = '';
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {FormControl, Validators} from '@angular/forms';
import {SignErrorStateMatcher} from '../ErrorStateMatchers/sign-error-state-matcher';
import {UserService} from '../users/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MasterService} from '../masters/master.service';
import {ClientService} from '../clients/client.service';
import {Master} from '../model/master';
import {Client} from '../model/client';

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

  constructor (
    private userService: UserService,
    private router: Router,
    private masterService: MasterService,
    private clientService: ClientService
  ) { }

  ngOnInit() { }

  SignIn(): void {
    if (this.user && this.user.email && this.user.password) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.userService.getUsers(token).subscribe( resp => {
        this.user.roles = this.userService.findUser(resp, this.user).roles;
        this.user.id = this.userService.findUser(resp, this.user).id;
        this.userService.setCurrentUser(this.user);
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
      const thisUser = this.user;
      const returnedUser = this.userService.postUser(thisUser).subscribe(
        (user) => {
          thisUser.id = user.id;
          this.userService.setCurrentUser(thisUser);
          const token = 'Basic ' + btoa(thisUser.email + ':' + thisUser.password);
          if (this.user.roles.includes('ROLE_MASTER')) {
            const newMaster = new Master();
            newMaster.account = user;
            this.masterService.post(newMaster, token).subscribe(() => this.router.navigate(['']));
          }
          if (this.user.roles.includes('ROLE_CLIENT')) {
            const newClient = new Client();
            newClient.account = user;
            this.clientService.post(newClient, token).subscribe(() => this.router.navigate(['']));
          }
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

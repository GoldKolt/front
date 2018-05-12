import {Component, OnInit} from '@angular/core';
import {User} from './model/user';
import {UserService} from './users/user.service';
import {CookieService} from 'ngx-cookie';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cars Repair Service';
  currentUser = new User();

  constructor(private userService: UserService, private cookie: CookieService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  Toogle() {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['SignIn'], {replaceUrl: true});
    }
  }

  LogOff() {
    this.userService.clearCurrentUser();
    this.currentUser = null;
    this.router.navigate(['SignIn'], {replaceUrl: true});
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from './model/user';
import {UserService} from './users/user.service';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cars Repair Service';
  currentUser = new User();

  constructor(private userService: UserService, private cookie: CookieService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  Toogle() {
    this.currentUser = this.userService.getCurrentUser();
  }
}

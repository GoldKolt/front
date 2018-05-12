import { Component, OnInit } from '@angular/core';
import {UserService} from '../../users/user.service';
import {Router} from '@angular/router';
import {MasterService} from '../master.service';
import {Master} from '../../model/master';
import {User} from '../../model/user';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {
  master: Master = new Master();
  id = this.router.url.split('/').pop();
  user: User;
  token: string;
  constructor(private masterService: MasterService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.masterService.get(this.id, this.token).subscribe(resp => this.master = resp);
  }

}

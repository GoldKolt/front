import { Component, OnInit } from '@angular/core';
import {Client} from '../../model/client';
import {User} from '../../model/user';
import {ClientService} from '../client.service';
import {Router} from '@angular/router';
import {UserService} from '../../users/user.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: Client = new Client();
  id = this.router.url.split('/').pop();
  user: User;
  token: string;
  constructor(private clientService: ClientService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.clientService.get(this.id, this.token).subscribe(resp => this.client = resp);
  }

}

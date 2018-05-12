import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../users/user.service';
import {MasterService} from '../masters/master.service';
import {ClientService} from '../clients/client.service';
import {Master} from '../model/master';
import {Client} from '../model/client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  token: string;
  master: Master = new Master();
  client: Client = new Client();
  constructor(
    private userService: UserService,
    private router: Router,
    private masterService: MasterService,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['SignIn'], {replaceUrl: true});
    }
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    if (this.user.roles.includes('ROLE_MASTER')) {
      this.masterService.getAll(this.token).subscribe(masters => {
        if (masters) {
          this.master = masters.find(value => value.account.id === this.user.id);
        }
      });
    } else {
      if (this.user.roles.includes('ROLE_CLIENT')) {
        this.clientService.getAll(this.token).subscribe(clients => {
          if (clients) {
            this.client = clients.find(value => value.account.id === this.user.id);
          }
        });
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {Master} from '../../model/master';
import {Client} from '../../model/client';
import {UserService} from '../../users/user.service';
import {ClientService} from '../client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients: Client[];
  check: boolean[];
  checkedClient: Client;
  index = -1;
  user: User;
  token: string;
  constructor(private userService: UserService, private clientService: ClientService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.clientService.getAll(this.token).subscribe(data => {
      this.clients = data;
      if (data) {
        this.check = new Array<boolean>(data.length);
      }
    });
  }

  Delete() {
    if (this.index > -1) {
      this.clientService.delete(this.checkedClient.id, this.token).subscribe(() => {
        this.checkedClient = null;
        this.clients.splice( this.index, 1 );
        this.check.splice( this.index, 1 );
        this.index = -1;
      });
    }
  }

  Check(client) {
    const index = this.clients.indexOf(client);
    if (this.index === index) {
      this.checkedClient = null;
      this.index = -1;
    } else {
      if (this.index !== -1) {
        this.check[this.index] = false;
      }
      this.checkedClient = client;
      this.index = index;
      this.check[index] = true;
    }
  }

}

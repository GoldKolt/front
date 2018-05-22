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
    for (let index = this.clients.length - 1; index >= 0; --index) {
      if (this.check[index]) {
        this.clientService.delete(this.clients[index].id, this.token).subscribe();
        this.clients.splice(index, 1);
        this.check.splice(index, 1);
      }
    }
  }

  Check(client) {
    const index = this.clients.indexOf(client);
    this.check[index] = !this.check[index];
  }

}

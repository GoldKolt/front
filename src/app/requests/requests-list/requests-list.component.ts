import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import {Client} from '../../model/client';
import {Request} from '../../model/request';
import {ClientService} from '../../clients/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

  client: Client = new Client();
  requests: Request[] = new Array<Request>(0);
  check: boolean[];
  index = -1;
  user: User;
  token: string;
  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private  clientService: ClientService,
    private router: Router
    ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    if (this.user.roles.includes('ROLE_CLIENT')) {
      this.clientService.getAll(this.token).subscribe(resp => {
        if (resp) {
          this.client = resp.find(value => value.account.id === this.user.id);
          this.requestService.client = this.client;
          this.requestService.getAll(this.token).subscribe(request => {
            if (request) {
              this.check = new Array<boolean>(request.length);
              request.forEach(value => {
                if (value.owner.id === this.client.id) {
                  this.requests.push(value);
                }
              });
            }
          });
        }
      });
    } else {
      this.requestService.getAll(this.token).subscribe(requests => {
        if (requests) {
          this.check = new Array<boolean>(requests.length);
          this.requests = requests;
        }
      });
    }
  }

  Delete() {
    for (let index = this.requests.length - 1; index >= 0; --index) {
      if (this.check[index]) {
        this.requestService.delete(this.requests[index].id, this.token).subscribe();
        this.requests.splice(index, 1);
        this.check.splice(index, 1);
      }
    }
  }

  Check(request) {
    const index = this.requests.indexOf(request);
    this.check[index] = this.check[index];
  }
}

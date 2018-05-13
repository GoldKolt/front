import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import {Client} from '../../model/client';
import {ClientService} from '../../clients/client.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

  client: Client = new Client();
  check: boolean[];
  index = -1;
  user: User;
  token: string;
  constructor(private requestService: RequestService, private userService: UserService, private  clientService: ClientService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.clientService.getAll(this.token).subscribe(resp => {
      if (resp) {
        this.client = resp.find(value => value.account.id === this.user.id);
        this.requestService.client = this.client;
        this.requestService.getAll(this.token).subscribe(request => {
          this.check = new Array<boolean>(request.length);
          request.forEach(value => {
            if (value.owner.id === this.client.id) {
              this.client.requests.push(value);
            }
          });
        });
      }
    });
  }

  Edit() {
    if (this.index >= 0) {
      this.requestService.editingRequest = this.client.requests[this.index];
    } else {
      this.requestService.editingRequest = null;
    }
  }

  Delete() {
    if (this.index > -1) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.requestService.delete(this.client.requests[this.index].id, token).subscribe(() => {
        this.client.requests.splice( this.index, 1 );
        this.check.splice( this.index, 1 );
        this.index = -1;
      });
    }
  }

  Check(request) {
    const index = this.client.requests.indexOf(request);
    if (this.index === index) {
      this.index = -1;
    } else {
      if (this.index !== -1) {
        this.check[this.index] = false;
      }
      this.index = index;
      this.check[index] = true;
    }
  }
}

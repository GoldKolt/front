import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../users/user.service';
import {ClientService} from '../client.service';
import {User} from '../../model/user';
import {Client} from '../../model/client';

@Component({
  selector: 'app-client-detail-edit',
  templateUrl: './client-detail-edit.component.html',
  styleUrls: ['./client-detail-edit.component.css']
})
export class ClientDetailEditComponent implements OnInit {

  @Input() public client: Client;
  user: User;
  token: string;
  saved = false;

  constructor(
    private userService: UserService,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
  }

  Submit() {
    if (this.client.phoneNumber && this.client.birthDay && this.client.fullName) {
      this.clientService.put(this.client, this.token).subscribe(() => this.saved = true, () => this.saved = false);
    }
  }
}

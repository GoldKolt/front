import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
import {Master} from '../../model/master';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-masters-list',
  templateUrl: './masters-list.component.html',
  styleUrls: ['./masters-list.component.css']
})
export class MastersListComponent implements OnInit {

  masters: Master[];
  check: boolean[];
  user: User;
  token: string;
  constructor(private userService: UserService, private masterListService: MasterService) {
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.masterListService.getAll(this.token).subscribe(data => {
      this.masters = data;
      if (data) {
        this.check = new Array<boolean>(data.length);
      }
    });
  }

  Delete() {
    for (let index = this.masters.length - 1; index >= 0; --index) {
      if (this.check[index]) {
        this.masterListService.delete(this.masters[index].id, this.token).subscribe();
        this.masters.splice(index, 1);
        this.check.splice(index, 1);
      }
    }
  }

  Check(master) {
    const index = this.masters.indexOf(master);
    this.check[index] = this.check[index];
  }
}

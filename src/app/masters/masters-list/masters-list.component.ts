import { Component, OnInit } from '@angular/core';
import {MasterService} from '../master.service';
import {Master} from '../../model/master';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-masters-list',
  templateUrl: './masters-list.component.html',
  styleUrls: ['./masters-list.component.css'],
  providers: [MasterService]
})
export class MastersListComponent implements OnInit {

  masters: Master[];
  check: boolean[];
  checkedMaster: Master;
  index = -1;
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
    if (this.index > -1) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.masterListService.delete(this.checkedMaster.id, token).subscribe(() => {
        this.checkedMaster = null;
        this.masters.splice( this.index, 1 );
        this.check.splice( this.index, 1 );
        this.index = -1;
      });
    }
  }

  Check(master) {
    const index = this.masters.indexOf(master);
    if (this.index === index) {
      this.checkedMaster = null;
      this.index = -1;
    } else {
      if (this.index !== -1) {
        this.check[this.index] = false;
      }
      this.checkedMaster = master;
      this.index = index;
      this.check[index] = true;
    }
  }
}

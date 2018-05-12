import { Component, OnInit } from '@angular/core';
import {TypeOperation} from '../../model/type-operation';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';
import {Location} from '@angular/common';
import {TypeOperationService} from '../type-operation.service';

@Component({
  selector: 'app-type-operation-edit',
  templateUrl: './type-operation-edit.component.html',
  styleUrls: ['./type-operation-edit.component.css']
})
export class TypeOperationEditComponent implements OnInit {

  type: TypeOperation = new TypeOperation();
  user: User;
  token: string;
  post = false;
  constructor(private userService: UserService, private typeOperationService: TypeOperationService, private location: Location) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    if (this.typeOperationService.editingType) {
      this.type = this.typeOperationService.editingType;
    } else {
      this.post = true;
    }
  }

  Submit() {
    if (this.post) {
      this.typeOperationService.post(this.type, this.token).subscribe(() => this.location.back());
    } else {
      this.typeOperationService.put(this.type, this.token).subscribe(() => this.location.back());
    }
  }
}

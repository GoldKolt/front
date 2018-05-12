import { Component, OnInit } from '@angular/core';
import {TypeOperationService} from '../type-operation.service';
import {TypeOperation} from '../../model/type-operation';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';

@Component({
  selector: 'app-type-operations-list',
  templateUrl: './type-operations-list.component.html',
  styleUrls: ['./type-operations-list.component.css']
})
export class TypeOperationsListComponent implements OnInit {

  types: TypeOperation[];
  check: boolean[];
  index = -1;
  user: User = new User();
  constructor(private userService: UserService, private typeOperationService: TypeOperationService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.typeOperationService.getAll().subscribe(resp => {
      this.types = resp;
      if (resp) {
        this.check = new Array<boolean>(resp.length);
      }
    });
  }

  Edit() {
    if (this.index >= 0) {
      this.typeOperationService.editingType = this.types[this.index];
    } else {
      this.typeOperationService.editingType = null;
    }
  }

  Delete() {
    if (this.index > -1) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.typeOperationService.delete(this.types[this.index].id, token).subscribe(() => {
        this.types.splice( this.index, 1 );
        this.check.splice( this.index, 1 );
        this.index = -1;
      });
    }
  }

  Check(type) {
    const index = this.types.indexOf(type);
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

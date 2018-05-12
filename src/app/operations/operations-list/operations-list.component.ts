import { Component, OnInit } from '@angular/core';
import {OperationService} from '../operation.service';
import {Operation} from '../../model/operation';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css']
})
export class OperationsListComponent implements OnInit {

  operations: Operation[];
  check: boolean[];
  index = -1;
  user: User = new User();
  constructor(private operationService: OperationService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.operationService.getAll().subscribe(resp => {
      this.operations = resp;
      if (resp) {
        this.check = new Array<boolean>(resp.length);
      }
    });
  }

  Edit() {
    if (this.index >= 0) {
      this.operationService.editingOperation = this.operations[this.index];
    } else {
      this.operationService.editingOperation = null;
    }
  }

  Delete() {
    if (this.index > -1) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.operationService.delete(this.operations[this.index].id, token).subscribe(() => {
        this.operations.splice( this.index, 1 );
        this.check.splice( this.index, 1 );
        this.index = -1;
      });
    }
  }

  Check(operation) {
    const index = this.operations.indexOf(operation);
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

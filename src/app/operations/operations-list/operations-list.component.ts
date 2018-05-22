import { Component, OnInit } from '@angular/core';
import {OperationService} from '../operation.service';
import {Operation} from '../../model/operation';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import { Router } from '@angular/router';
import { MasterService } from '../../masters/master.service';
import { Master } from '../../model/master';

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
  token: string;
  master: Master;
  constructor(
    private operationService: OperationService,
    private userService: UserService,
    private router: Router,
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    if (this.user.roles.includes('ROLE_MASTER')) {
      this.masterService.getAll(this.token).subscribe(masters => {
        this.master = masters.find(value => value.account.id === this.user.id);
        this.operations = this.master.acceptedOperation;
      })
    } else {
      this.operationService.getAll(this.token).subscribe(resp => {
        this.operations = resp;
        if (resp) {
          this.check = new Array<boolean>(resp.length);
        }
      });
    }
  }

  Edit() {
    if (this.index >= 0) {
      this.operationService.editingOperation = this.operations[this.index];
      this.router.navigate(['Operation','Post'], {replaceUrl: true});
    }
  }

  Delete() {
    const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    for (let index = this.check.length - 1; index >= 0; index--){
      if (this.check[index]) {
        this.operationService.delete(this.operations[index].id, token).subscribe();
        this.operations.splice(index, 1);
        this.check.splice(index, 1);
      }
    }
  }

  Check(operation) {
    const index = this.operations.indexOf(operation);
    if (this.user.roles.includes('ROLE_MASTER')) {
      if (this.index === index) {
        this.index = -1;
      } else {
        if (this.index !== -1) {
          this.check[this.index] = false;
        }
        this.index = index;
        this.check[index] = true;
      }
    } else {
      this.check[index] = !this.check[index];
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {TypeOperationService} from '../type-operation.service';
import {TypeOperation} from '../../model/type-operation';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-operations-list',
  templateUrl: './type-operations-list.component.html',
  styleUrls: ['./type-operations-list.component.css']
})
export class TypeOperationsListComponent implements OnInit {

  types: TypeOperation[];
  check: boolean[];
  user: User = new User();
  constructor(
    private userService: UserService,
    private typeOperationService: TypeOperationService,
    private router: Router
  ) { }

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
    if (this.check) {
      if (this.check.indexOf(true, this.check.indexOf(true) + 1) === -1) {
        let index = this.check.indexOf(true);
        if (index > -1) {
          this.typeOperationService.editingType = this.types[index];
        } else {
          this.typeOperationService.editingType = null;
        }
        this.router.navigate(['TypeOperation','Post'], {replaceUrl: true});
      }
    } else {
      this.typeOperationService.editingType = null;
      this.router.navigate(['TypeOperation','Post'], {replaceUrl: true});
    }
  }

  Delete() {
    for (let index = this.types.length - 1; index >= 0; --index) {
      if (this.check[index]) {
        const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
        this.typeOperationService.delete(this.types[index].id, token).subscribe();
        this.types.splice( index, 1 );
        this.check.splice( index, 1 );
      }
    }
  }

  Check(type) {
    const index = this.types.indexOf(type);
    this.check[index] = !this.check[index];
  }
}

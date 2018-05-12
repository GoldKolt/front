import { Component, OnInit } from '@angular/core';
import {TypeOperation} from '../../model/type-operation';
import {User} from '../../model/user';
import {TypeOperationService} from '../type-operation.service';
import {Router} from '@angular/router';
import {UserService} from '../../users/user.service';

@Component({
  selector: 'app-type-operation-detail',
  templateUrl: './type-operation-detail.component.html',
  styleUrls: ['./type-operation-detail.component.css']
})
export class TypeOperationDetailComponent implements OnInit {

  type: TypeOperation = new TypeOperation();
  id = this.router.url.split('/').pop();
  user: User;
  token: string;
  constructor(private typeOperationService: TypeOperationService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.typeOperationService.get(this.id, this.token).subscribe(resp => this.type = resp);
  }

}

import { Component, OnInit } from '@angular/core';
import {SparePart} from '../../model/spare-part';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';
import {SparePartService} from '../spare-part.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spare-part-edit',
  templateUrl: './spare-part-edit.component.html',
  styleUrls: ['./spare-part-edit.component.css']
})
export class SparePartEditComponent implements OnInit {

  sparePart: SparePart = new SparePart();
  user: User;
  token: string;
  post = false;
  constructor(
    private userService: UserService,
    private sparePartService: SparePartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    if (this.sparePartService.editingSparePart) {
      this.sparePart = this.sparePartService.editingSparePart;
    } else {
      this.post = true;
    }
  }

  Submit() {
    if (this.post) {
      this.sparePartService.post(this.sparePart, this.token).subscribe(() => this.router.navigate(['SpareParts'], {replaceUrl: true}));
    } else {
      this.sparePartService.put(this.sparePart, this.token).subscribe(() => this.router.navigate(['SpareParts'], {replaceUrl: true}));
    }
  }
}

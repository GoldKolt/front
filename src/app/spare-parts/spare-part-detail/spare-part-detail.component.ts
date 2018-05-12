import { Component, OnInit } from '@angular/core';
import {SparePartService} from '../spare-part.service';
import {Router} from '@angular/router';
import {UserService} from '../../users/user.service';
import {SparePart} from '../../model/spare-part';
import {User} from '../../model/user';

@Component({
  selector: 'app-spare-part-detail',
  templateUrl: './spare-part-detail.component.html',
  styleUrls: ['./spare-part-detail.component.css']
})
export class SparePartDetailComponent implements OnInit {

  sparePart: SparePart = new SparePart();
  id = this.router.url.split('/').pop();
  user: User;
  token: string;
  constructor(private sparePartService: SparePartService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.sparePartService.get(this.id, this.token).subscribe(resp => this.sparePart = resp);
  }

}

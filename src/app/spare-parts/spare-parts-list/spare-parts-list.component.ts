import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';
import {SparePartService} from '../spare-part.service';
import {SparePart} from '../../model/spare-part';

@Component({
  selector: 'app-spare-parts-list',
  templateUrl: './spare-parts-list.component.html',
  styleUrls: ['./spare-parts-list.component.css']
})
export class SparePartsListComponent implements OnInit {

  spareParts: SparePart[];
  check: boolean[];
  index = -1;
  user: User = new User();
  constructor(private userService: UserService, private sparePartService: SparePartService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.sparePartService.getAll().subscribe(resp => {
      this.spareParts = resp;
      if (resp) {
        this.check = new Array<boolean>(resp.length);
      }
    });
  }

  Edit() {
    if (this.index >= 0) {
      this.sparePartService.editingSparePart = this.spareParts[this.index];
    } else {
      this.sparePartService.editingSparePart = null;
    }
  }

  Delete() {
    if (this.index > -1) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.sparePartService.delete(this.spareParts[this.index].id, token).subscribe(() => {
        this.spareParts.splice( this.index, 1 );
        this.check.splice( this.index, 1 );
        this.index = -1;
      });
    }
  }

  Check(sparePart) {
    const index = this.spareParts.indexOf(sparePart);
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

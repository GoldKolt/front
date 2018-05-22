import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';
import {SparePartService} from '../spare-part.service';
import {SparePart} from '../../model/spare-part';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spare-parts-list',
  templateUrl: './spare-parts-list.component.html',
  styleUrls: ['./spare-parts-list.component.css']
})
export class SparePartsListComponent implements OnInit {

  spareParts: SparePart[];
  check: boolean[];
  user: User = new User();
  constructor(
    private userService: UserService,
    private sparePartService: SparePartService,
    private router: Router
  ) { }

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
    if (this.check) {
      if (this.check.indexOf(true, this.check.indexOf(true) + 1) === -1) {
        let index = this.check.indexOf(true);
        if (index > -1) {
          this.sparePartService.editingSparePart = this.spareParts[index];
        } else {
          this.sparePartService.editingSparePart = null;
        }
        this.router.navigate(['SparePart','Post'], {replaceUrl: true});
      }
    } else {
      this.sparePartService.editingSparePart = null;
      this.router.navigate(['SparePart','Post'], {replaceUrl: true});
    }
  }

  Delete() {
    for (let index = this.spareParts.length - 1; index >= 0; --index) {
      if (this.check[index]) {
        const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
        this.sparePartService.delete(this.spareParts[index].id, token).subscribe();
        this.spareParts.splice( index, 1 );
        this.check.splice( index, 1 );
      }
    }
  }

  Check(sparePart) {
    const index = this.spareParts.indexOf(sparePart);
    this.check[index] = !this.check[index];
  }
}

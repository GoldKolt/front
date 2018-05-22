import {Component, OnInit} from '@angular/core';
import {CarService} from '../../model/carservice';
import {CarServiceDataService} from '../car-service-data.service';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  services: CarService[];
  check: boolean[];
  user: User = new User();
  token: string;
  constructor(
    private carServiceDataService: CarServiceDataService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.carServiceDataService.getAll().subscribe(data => {
      this.services = data;
      if (data) {
        this.check = new Array<boolean>(data.length);
      }
    });
  }

  Edit() {
    if (this.check) {
      if (this.check.indexOf(true, this.check.indexOf(true) + 1) === -1) {
        let index = this.check.indexOf(true);
        if (index > -1) {
          this.carServiceDataService.editingService = this.services[index];
        } else {
          this.carServiceDataService.editingService = null;
        }
        this.router.navigate(['Service','Post'], {replaceUrl: true});
      }
    } else {
      this.carServiceDataService.editingService = null;
      this.router.navigate(['Service','Post'], {replaceUrl: true});
    }
  }

  Delete() {
    for (let index = this.services.length - 1; index >= 0; --index) {
      if (this.check[index]) {
        this.carServiceDataService.delete(this.services[index].id, this.token).subscribe();
        this.services.splice(index, 1);
        this.check.splice(index, 1);
      }
    }
  }

  Check(carService) {
    const index = this.services.indexOf(carService);
    this.check[index] = !this.check[index];
  }
}

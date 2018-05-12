import {Component, OnInit} from '@angular/core';
import {CarService} from '../../model/carservice';
import {CarServiceDataService} from '../car-service-data.service';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  services: CarService[];
  checkedService: CarService;
  check: boolean[];
  index = -1;
  user: User = new User();
  constructor(private carServiceDataService: CarServiceDataService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.carServiceDataService.getAll().subscribe(data => {
      this.services = data;
      if (data) {
        this.check = new Array<boolean>(data.length);
      }
    });
  }

  Edit() {
    this.carServiceDataService.editingService = this.checkedService;
  }

  Delete() {
    if (this.index > -1) {
      const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
      this.carServiceDataService.delete(this.checkedService.id, token).subscribe(() => {
        this.checkedService = null;
        this.services.splice( this.index, 1 );
        this.check.splice( this.index, 1 );
        this.index = -1;
      });
    }
  }

  Check(carService) {
    const index = this.services.indexOf(carService);
    if (this.index === index) {
      this.checkedService = null;
      this.index = -1;
    } else {
      if (this.index !== -1) {
        this.check[this.index] = false;
      }
      this.checkedService = carService;
      this.index = index;
      this.check[index] = true;
    }
  }
}

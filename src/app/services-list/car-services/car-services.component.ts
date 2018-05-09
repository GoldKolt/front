import { Component, OnInit } from '@angular/core';
import {CarServiceDataService} from '../car-service-data.service';
import {CarService} from '../../model/carservice';
import {Router} from '@angular/router';
import {UserService} from '../../users-list/user.service';

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.css']
})
export class CarServicesComponent implements OnInit {
  service: CarService = new CarService();
  id = this.router.url.split('/').pop();
  user = this.userService.getCurrentUser();
  constructor(private carServiceDataService: CarServiceDataService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.carServiceDataService.get(this.id).subscribe(resp => {
      this.service = resp;
    });
  }
}

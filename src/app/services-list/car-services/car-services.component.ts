import { Component, OnInit } from '@angular/core';
import {CarServiceDataService} from '../car-service-data.service';
import {CarService} from '../../model/carservice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.css'],
  providers: [CarServiceDataService]
})
export class CarServicesComponent implements OnInit {
  service: CarService = new CarService();
  id = this.router.url.split('/').pop();
  constructor(private carServiceDataService: CarServiceDataService, private router: Router) { }

  ngOnInit() {
    this.carServiceDataService.get(this.id).subscribe(resp => {
      this.service = resp;
      console.log(this.service);
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {CarService} from '../model/carservice';
import {CarServiceDataService} from './car-service-data.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
  providers: [CarServiceDataService]
})
export class ServicesListComponent implements OnInit {
  services: CarService[];
  constructor(private carServiceDataService: CarServiceDataService) { }

  ngOnInit() {
    this.carServiceDataService.getAll().subscribe(data => {
      this.services = data;
    });
  }
}

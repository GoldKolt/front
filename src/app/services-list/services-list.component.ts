import { Component, OnInit } from '@angular/core';
import {CarService} from '../model/carservice';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {

  services: CarService[];
  constructor() { }

  ngOnInit() {
  }

}

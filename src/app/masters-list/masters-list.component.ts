import { Component, OnInit } from '@angular/core';
import {MasterService} from './master.service';
import {Master} from '../model/master';

@Component({
  selector: 'app-masters-list',
  templateUrl: './masters-list.component.html',
  styleUrls: ['./masters-list.component.css'],
  providers: [MasterService]
})
export class MastersListComponent implements OnInit {

  masters: Master[];
  constructor(private masterListService: MasterService) {
    this.masterListService.getAll().subscribe(res => { console.log(res); });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {CarServiceDataService} from '../car-service-data.service';
import {MasterService} from '../../masters/master.service';
import {Master} from '../../model/master';
import {CarService} from '../../model/carservice';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import {SparePartService} from '../../spare-parts/spare-part.service';
import {PairSparePartCount} from '../../model/pair-spare-part-count';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-serv',
  templateUrl: './edit-serv.component.html',
  styleUrls: ['./edit-serv.component.css']
})
export class EditServComponent implements OnInit {

  masters: Master[];
  countSpareParts: PairSparePartCount[] = [];
  editingService: CarService;
  user: User;
  token: string;
  checkMaster: boolean[];
  post = false;

  constructor(
    private carServiceDataService: CarServiceDataService,
    private masterService: MasterService,
    private userService: UserService,
    private sparePartService: SparePartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.editingService = this.carServiceDataService.editingService;
    if (!this.editingService) {
      this.editingService = new CarService();
      this.post = true;
    }

    this.masterService.getAll(this.token).subscribe(masters => {
      this.masters = masters;
      if (masters) {
        this.checkMaster = new Array<boolean>(masters.length);
        if (this.editingService.masters) {
          this.editingService.masters.forEach(value => {
            const index = this.masters.findIndex(value1 => value1.id === value.id);
            if (index !== -1) {
              this.checkMaster[index] = true;
            }
          });
        }
      }
    });

    this.sparePartService.getAll(this.token).subscribe( spareParts => {
      if (spareParts) {
        spareParts.forEach(value => {
          const newPart = new PairSparePartCount();
          newPart.sparePart = value;
          const index = this.editingService.sparePartsCount.findIndex(value2 => value2.sparePart.id === value.id);
          if (index >= 0) {
            newPart.count = this.editingService.sparePartsCount[index].count;
          } else {
            newPart.count = 0;
          }
          this.countSpareParts.push(newPart);
        });
        if (this.editingService.sparePartsCount) {
          this.editingService.sparePartsCount.forEach(value => {
            const sparePartIndex = this.countSpareParts.findIndex(value1 => value1.sparePart.id === value.sparePart.id );
            if (sparePartIndex !== -1) {
              value.count = this.editingService.sparePartsCount[sparePartIndex].count;
            }
          });
        }
      }
    });
  }

  CheckMaster(master) {
    const index = this.masters.indexOf(master);
    this.checkMaster[index] = !this.checkMaster[index];
  }

  ChangePartsCount(event, part: PairSparePartCount) {
    const count = Number.parseInt(event.target.value, 10);
    if (count > -1) {
      part.count = count;
    } else {
      event.target.value = part.count;
    }
  }

  Submit() {
    if (this.editingService.address) {
      this.editingService.masters = [];
      this.editingService.sparePartsCount = [];
      if (this.checkMaster) {
        this.masters.forEach(value => {
          const index = this.masters.indexOf(value);
          if (this.checkMaster[index]) {
            this.editingService.masters.push(value);
          }
        });
      }
      if (this.countSpareParts) {
        this.countSpareParts.forEach(value => {
          if (value.count > 0) {
            const newCountPart = new PairSparePartCount();
            newCountPart.sparePart = value.sparePart;
            newCountPart.count = value.count;
            this.editingService.sparePartsCount.push(newCountPart);
          }
        });
      }
      if (this.post) {
        this.carServiceDataService.post(this.editingService, this.token).subscribe( () => this.router.navigate(['Services'], {replaceUrl: true} ))
      } else {
        this.carServiceDataService.put(this.editingService, this.token).subscribe( () => this.router.navigate(['Services'], {replaceUrl: true}) )
      }
    }
  }
}

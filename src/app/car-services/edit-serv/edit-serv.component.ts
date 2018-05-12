import { Component, OnInit } from '@angular/core';
import {CarServiceDataService} from '../car-service-data.service';
import {MasterService} from '../../masters/master.service';
import {Master} from '../../model/master';
import {CarService} from '../../model/carservice';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import {SparePartService} from '../../spare-parts/spare-part.service';
import {PairSparePartCount} from '../../model/pair-spare-part-count';
import {RequestService} from '../../requests/request.service';
import {Request} from '../../model/request';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-serv',
  templateUrl: './edit-serv.component.html',
  styleUrls: ['./edit-serv.component.css']
})
export class EditServComponent implements OnInit {

  masters: Master[];
  countSpareParts: PairSparePartCount[] = [];
  requests: Request[];
  editingService: CarService;
  user: User;
  token: string;
  checkMaster: boolean[];
  checkRequest: boolean[];
  post = false;

  constructor(
    private carServiceDataService: CarServiceDataService,
    private masterService: MasterService,
    private userService: UserService,
    private sparePartService: SparePartService,
    private requestService: RequestService,
    private location: Location
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
        this.masters.forEach(value => {
          const index = this.editingService.masters.findIndex(value1 => value1.id === value.id);
          if (index !== -1) {
            this.checkMaster[index] = true;
          }
        });
      }
    });

    this.sparePartService.getAll(this.token).subscribe( spareParts => {
      if (spareParts) {
        spareParts.forEach(value => {
          const newPart = new PairSparePartCount();
          newPart.sparePart = value;
          newPart.count = 0;
          this.countSpareParts.push(newPart);
        });
        this.countSpareParts.forEach(value => {
          const sparePartIndex = this.editingService.sparePartsCount.findIndex(value1 => value1.sparePart.id === value.sparePart.id );
          if (sparePartIndex !== -1) {
            value.count = this.editingService.sparePartsCount[sparePartIndex].count;
          }
        });
      }
    });

    this.requestService.getAll(this.token).subscribe(requests => {
      this.requests = requests;
      if (requests) {
        this.checkRequest = new Array<boolean>(requests.length);
        this.requests.forEach(value => {
          const index = this.editingService.requestsList.findIndex(value1 => value1.id === value.id);
          if (index !== -1) {
            this.checkRequest[index] = true;
          }
        });
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

  CheckRequest(request) {
    const index = this.requests.indexOf(request);
    this.checkRequest[index] = !this.checkRequest[index];
  }

  Submit() {
    if (this.editingService.address) {
      this.editingService.masters = [];
      this.editingService.requestsList = [];
      this.editingService.sparePartsCount = [];
      if (this.checkMaster) {
        this.masters.forEach(value => {
          const index = this.masters.indexOf(value);
          if (this.checkMaster[index]) {
            this.editingService.masters.push(value);
          }
        });
      }
      if (this.checkRequest) {
        this.requests.forEach(value => {
          const index = this.requests.indexOf(value);
          if (this.checkRequest[index]) {
            this.editingService.requestsList.push(value);
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
        this.carServiceDataService.post(this.editingService, this.token).subscribe(() => this.location.back());
      } else {
        this.carServiceDataService.put(this.editingService, this.token).subscribe(() => this.location.back());
      }
    }
  }
}

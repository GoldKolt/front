import {Component, OnInit} from '@angular/core';
import {Request} from '../../model/request';
import {RequestService} from '../request.service';
import {Client} from '../../model/client';
import {Operation} from '../../model/operation';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';
import {OperationService} from '../../operations/operation.service';
import {Location} from '@angular/common';
import {CarServiceDataService} from '../../car-services/car-service-data.service';
import {CarService} from '../../model/carservice';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request: Request = new Request();
  client: Client;
  operations: Operation[];
  check: boolean[];
  user: User;
  token: string;
  post = false;
  carServices: CarService[];
  showServices = false;
  indexService = -1;
  checkService: boolean[];
  constructor(
    private requestService: RequestService,
    private operationService: OperationService,
    private userService: UserService,
    private location: Location,
    private carServiceDataService: CarServiceDataService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.client = this.requestService.client;
    this.request = this.requestService.editingRequest;
    if (!this.request) {
      this.request = new Request();
      this.post = true;
    }
    this.operationService.getAll(this.token).subscribe(operations => {
      this.operations = operations;
      if (operations) {
        this.check = new Array<boolean>(operations.length);
        if (this.request.necessaryOperations) {
          this.request.necessaryOperations.forEach(value => {
            const index = this.operations.findIndex(value1 => value1.id === value.id);
            if (index !== -1) {
              this.check[index] = true;
            }
          });
        }
      }
    });
  }

  CreateOperation() {
    let index = -1;
    if (this.operations) {
      index = this.check.findIndex(value => value);
    }
    index > -1 ? this.operationService.editingOperation = this.operations[index] : this.operationService.editingOperation = null;
    console.log(index);
    console.log(this.operationService.editingOperation);
  }

  Submit() {
    this.request.necessaryOperations = [];
    if (this.check) {
      this.operations.forEach(value => {
        const index = this.operations.indexOf(value);
        if (this.check[index]) {
          this.request.necessaryOperations.push(value);
        }
      });
    }
    // const date = new Date();
    // this.request.dateTimeCreation =
    //   date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '@' +
    //   date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
    this.request.owner = this.client;
    if (this.post) {
      this.requestService.post(this.request, this.token).subscribe((request) => {
        console.log(request);
        this.carServiceDataService.getCarByRequest(request, this.token).subscribe(services => {
          this.carServices = services;
          if (this.carServices) {
            this.checkService = new Array<boolean>(this.carServices.length);
            this.showServices = true;
          } else {
            this.showServices = false;
          }
        });
      });
    } else {
      this.requestService.put(this.request, this.token).subscribe((request) => {
        console.log(request);
        this.carServiceDataService.getCarByRequest(request, this.token).subscribe(services => {
          if (services) {
            this.carServices = services;
            this.showServices = true;
            this.checkService = new Array<boolean>(this.carServices.length);
          } else {
            this.showServices = false;
          }
        });
      });
    }
  }

  Check(operation) {
    const index = this.operations.indexOf(operation);
    this.check[index] = !this.check[index];
  }

  CheckService(service) {
    const index = this.carServices.indexOf(service);
    if (this.indexService === index) {
      this.indexService = -1;
    } else {
      if (this.indexService !== -1) {
        this.checkService[this.indexService] = false;
      }
      this.indexService = index;
      this.checkService[index] = true;
    }
  }

  SendRequestToService() {
    if (this.indexService !== -1) {
      const editingCarService = this.carServices[this.indexService];
      if (!editingCarService.requestsList) {
        editingCarService.requestsList = new Array<Request>();
      }
      editingCarService.requestsList.push(this.request);
      this.carServiceDataService.put(editingCarService, this.token).subscribe(() => this.location.back());
    }
  }
}

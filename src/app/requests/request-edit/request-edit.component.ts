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

  request: Request;
  client: Client;
  check: boolean[];
  user: User;
  token: string;
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
    if (this.requestService.client) {
      this.client = this.requestService.client;
    }
    this.request = new Request();
    this.request.necessaryOperations = [];
    this.check = new Array<boolean>(0);
  }

  addOperation(operation: Operation) {
    console.log('qewqw');
    const newOperation = new Operation();
    newOperation.id = operation.id;
    newOperation.sparePart = operation.sparePart;
    newOperation.typeOperation = operation.typeOperation;
    newOperation.status = 'WAITING';
    this.request.necessaryOperations.push(newOperation);
  }

  DeleteOperation() {
    const token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    for (let index = this.check.length - 1; index >= 0; index--){
      if (this.check[index]) {
        console.log(this.request.necessaryOperations[index]);
        this.operationService.delete(this.request.necessaryOperations[index].id, token).subscribe(() => {

        });
        this.request.necessaryOperations.splice(index, 1);
        this.check.splice(index, 1);
      }
    }
  }

  Submit() {
    // const date = new Date();
    // this.request.dateTimeCreation =
    //   date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '@' +
    //   date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
    this.request.owner = this.client;
    console.log(this.client);
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
  }

  Check(operation) {
    const index = this.request.necessaryOperations.indexOf(operation);
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

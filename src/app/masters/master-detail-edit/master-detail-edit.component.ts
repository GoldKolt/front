import {Component, Input, OnInit} from '@angular/core';
import {Master} from '../../model/master';
import {User} from '../../model/user';
import {UserService} from '../../users/user.service';
import {OperationService} from '../../operations/operation.service';
import {TypeOperationService} from '../../type-operations/type-operation.service';
import {Operation} from '../../model/operation';
import {TypeOperation} from '../../model/type-operation';
import {MasterService} from '../master.service';

@Component({
  selector: 'app-master-detail-edit',
  templateUrl: './master-detail-edit.component.html',
  styleUrls: ['./master-detail-edit.component.css']
})
export class MasterDetailEditComponent implements OnInit {

  @Input() public master: Master;
  user: User;
  token: string;
  operations: Operation[];
  specializations: TypeOperation[];
  checkOperation: boolean[];
  checkSpecialization: boolean[];
  saved = false;

  constructor(
    private userService: UserService,
    private masterService: MasterService,
    private operationService: OperationService,
    private typeOperationService: TypeOperationService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);

    this.operationService.getAll(this.token).subscribe(operations => {
      this.operations = operations;
      if (operations) {
        this.checkOperation = new Array<boolean>(operations.length);
        this.master.acceptedOperation.forEach(value => {
          const index = this.operations.findIndex(value1 => value1.id === value.id);
          if (index !== -1) {
            this.checkOperation[index] = true;
          }
        });
      }
    });

    this.typeOperationService.getAll(this.token).subscribe(specializations => {
      this.specializations = specializations;
      if (specializations) {
        this.checkSpecialization = new Array<boolean>(specializations.length);
        this.master.specializations.forEach(value => {
          const index = this.specializations.findIndex(value1 => value1.id === value.id);
          if (index !== -1) {
            this.checkSpecialization[index] = true;
          }
        });
      }
    });
  }

  CheckOperation(operation) {
    const index = this.operations.indexOf(operation);
    this.checkOperation[index] = !this.checkOperation[index];
  }

  CheckSpecialization(specialization) {
    const index = this.specializations.indexOf(specialization);
    this.checkSpecialization[index] = !this.checkSpecialization[index];
  }

  Submit() {
    if (this.master.phoneNumber && this.master.birthDay && this.master.fullName) {
      this.master.acceptedOperation = [];
      this.master.specializations = [];
      if (this.checkOperation) {
        this.operations.forEach(value => {
          const index = this.operations.indexOf(value);
          if (this.checkOperation[index]) {
            this.master.acceptedOperation.push(value);
          }
        });
      }
      if (this.checkSpecialization) {
        this.specializations.forEach(value => {
          const index = this.specializations.indexOf(value);
          if (this.checkSpecialization[index]) {
            this.master.specializations.push(value);
          }
        });
      }
      this.masterService.put(this.master, this.token).subscribe(() => this.saved = true, () => this.saved = false);
    }
  }
}

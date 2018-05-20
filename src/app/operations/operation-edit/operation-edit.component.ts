import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Operation} from '../../model/operation';
import {User} from '../../model/user';
import {SparePart} from '../../model/spare-part';
import {OperationService} from '../operation.service';
import {SparePartService} from '../../spare-parts/spare-part.service';
import {TypeOperationService} from '../../type-operations/type-operation.service';
import {TypeOperation} from '../../model/type-operation';
import {UserService} from '../../users/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-operation-edit',
  templateUrl: './operation-edit.component.html',
  styleUrls: ['./operation-edit.component.css']
})
export class OperationEditComponent implements OnInit {

  @Output() newOperation = new EventEmitter<Operation>();
  operation: Operation = new Operation();
  spareParts: SparePart[];
  checkSparePart: boolean[];
  types: TypeOperation[];
  checkType: boolean[];
  user: User;
  token: string;
  post = false;
  indexSparePart = -1;
  indexTypeOperation = -1;
  status = 'WAITING';
  constructor(
    private operationService: OperationService,
    private sparePartService: SparePartService,
    private typeOperationService: TypeOperationService,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.operation = this.operationService.editingOperation;
    if (!this.operation) {
      this.operation = new Operation();
      this.post = true;
    }
    this.sparePartService.getAll(this.token).subscribe(spareParts => {
      this.spareParts = spareParts;
      if (spareParts) {
        this.checkSparePart = new Array<boolean>(spareParts.length);
        if (this.operation.sparePart) {
          const index = this.spareParts.findIndex(value => this.operation.sparePart.id === value.id);
          if (index !== -1) {
            this.checkSparePart[index] = true;
            this.indexSparePart = index;
          }
        }
      }
    });

    this.typeOperationService.getAll(this.token).subscribe(types => {
      this.types = types;
      if (types) {
        this.checkType = new Array<boolean>(types.length);
        if (this.operation.typeOperation) {
          const index = this.types.findIndex(value => this.operation.typeOperation.id === value.id);
          if (index !== -1) {
            this.checkType[index] = true;
            this.indexTypeOperation = index;
          }
        }
      }
    });
  }

  Submit() {
    console.log(this.post);
    this.operation.status = this.status;
    if (!this.post) {
      this.operationService.put(this.operation, this.token).subscribe(() => this.location.back());
    } else {
      this.operation.typeOperation = null;
      this.operation.sparePart = null;
      if (this.indexTypeOperation !== -1) {
        this.operation.typeOperation = this.types[this.indexTypeOperation];
        if (this.operation.typeOperation.sparePartIsNecessary) {
          if (this.indexSparePart !== -1) {
            this.operation.sparePart = this.spareParts[this.indexSparePart];
          }
        }
        this.operationService.post(this.operation, this.token).subscribe((resp) => {
          this.newOperation.emit(resp);
        });
      }
    }
  }

  CheckSparePart(sparePart) {
    const index = this.spareParts.indexOf(sparePart);
    if (this.indexSparePart === index) {
      this.indexSparePart = -1;
    } else {
      if (this.indexSparePart !== -1) {
        this.checkSparePart[this.indexSparePart] = false;
      }
      this.indexSparePart = index;
      this.checkSparePart[index] = true;
    }
  }

  CheckType(type) {
    const index = this.types.indexOf(type);
    if (this.indexTypeOperation === index) {
      this.indexTypeOperation = -1;
    } else {
      if (this.indexTypeOperation !== -1) {
        this.checkType[this.indexTypeOperation] = false;
      }
      this.indexTypeOperation = index;
      this.checkType[index] = true;
    }
  }
}

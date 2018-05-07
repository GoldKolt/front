import {Master} from './master';
import {Request} from './request';
import {PairSparePartCount} from './pair-spare-part-count';

export class CarService {
  address: string;
  masters: Master[];
  requestsList: Request[];
  sparePartsCount: PairSparePartCount[];
  id:string;

  constructor() {
    this.masters = [];
    this.requestsList = [];
    this.sparePartsCount = [];
  }
}

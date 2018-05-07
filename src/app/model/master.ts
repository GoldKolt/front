import {Operation} from './operation';
import {User} from './user';
import {TypeOperation} from './type-operation';

export class Master {
  acceptedOperation: [Operation];
  account: User;
  birthDay: string;
  fullName: string;
  phoneNumber: string;
  specializations: TypeOperation[];
  id: string;
}

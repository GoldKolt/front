import {User} from './user';
import {Request} from './request';

export class Client {
  account: User;
  birthDay: string;
  fullName: string;
  phoneNumber: string;
  requests: Request[];
}

import {Operation} from './operation';
import {Client} from './client';

export class Request {
  dateTimeCompletion: string;
  dateTimeCreation: string;
  necessaryOperations: Operation[];
  owner: Client;
  id: string;
}

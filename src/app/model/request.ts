import {Operation} from './operation';

export class Request {
  dateTimeCompletion: string;
  dateTimeCreation: string;
  necessaryOperations: Operation[];
  owner: string;
  id: string;
}

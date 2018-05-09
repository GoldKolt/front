import {MailTemplate} from './mail-template';

export class Mail {
  to: string[];
  subject: string;
  message: string;
  templateDTO: MailTemplate;
}

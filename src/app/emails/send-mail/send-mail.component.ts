import { Component, OnInit } from '@angular/core';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import {EmailService} from '../email.service';
import {Mail} from '../../model/mail';
import { MailTemplate } from '../../model/mail-template';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  emailsInput: string;
  messageInput: string;
  subject: string;
  user: User;
  token: string;
  isTemplate = false;
  templates: MailTemplate[];
  chosenTemplateId: string;
  constructor(private userService: UserService, private mailService: EmailService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.mailService.getAll(this.token).subscribe(templates => {
      if (templates) {
        this.templates = templates;
      }
    })
  }

  onLinkClick(event) {
    console.log(event);
  }

  Submit() {
    if (this.emailsInput && this.subject) {
      const emails = this.emailsInput.split(',');
      const mail = new Mail();
      mail.to = emails;
      mail.subject = this.subject;
      console.log(this.chosenTemplateId);
      console.log(mail);
      if (this.isTemplate) {
        mail.templateDTO = new MailTemplate();
        mail.templateDTO.id = this.chosenTemplateId;
      }
      mail.message = this.messageInput;
      console.log(this.isTemplate);
      this.mailService.send(mail, this.token).subscribe(() => console.log('Successfully sent'));
    }
  }
}

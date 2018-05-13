import { Component, OnInit } from '@angular/core';
import {UserService} from '../../users/user.service';
import {User} from '../../model/user';
import {EmailService} from '../email.service';
import {Mail} from '../../model/mail';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css'],
  providers: [EmailService]
})
export class SendMailComponent implements OnInit {

  emailsInput: string;
  messageInput: string;
  subject: string;
  user: User;
  token: string;
  constructor(private userService: UserService, private mailService: EmailService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
  }

  Submit() {
    const emails = this.emailsInput.split(',');
    const mail = new Mail();
    mail.to = emails;
    mail.subject = this.subject;
    mail.message = this.messageInput;
    this.mailService.send(mail, this.token).subscribe(() => console.log('Successfully sent'));
  }
}

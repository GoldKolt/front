import { Component, OnInit } from '@angular/core';
import { MailTemplate } from '../../model/mail-template';
import { EmailService } from '../email.service';
import { User } from '../../model/user';
import { UserService } from '../../users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-post',
  templateUrl: './template-post.component.html',
  styleUrls: ['./template-post.component.css']
})
export class TemplatePostComponent implements OnInit {

  user: User;
  token: string;
  template: MailTemplate = new MailTemplate();
  constructor(
    private mailService: EmailService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.template = this.mailService.editingTemplate;
    if (!this.template) {
      this.template = new MailTemplate();
    }
  }

  Submit() {
    if (this.mailService.editingTemplate) {
      this.mailService.put(this.template, this.token).subscribe(resp => this.router.navigate(['Templates'], {replaceUrl: true}) );
    } else {
      this.mailService.post(this.template, this.token).subscribe(resp => this.router.navigate(['Templates'], {replaceUrl: true}) );
    }
  }
}

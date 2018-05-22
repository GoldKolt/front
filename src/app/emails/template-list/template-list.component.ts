import { Component, OnInit } from '@angular/core';
import { MailTemplate } from '../../model/mail-template';
import { User } from '../../model/user';
import { EmailService } from '../email.service';
import { UserService } from '../../users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {

  templates: MailTemplate[] = [];
  user: User;
  token: string;
  check: Boolean[] = [];
  constructor(
    private mailService: EmailService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.token = 'Basic ' + btoa(this.user.email + ':' + this.user.password);
    this.mailService.getAll(this.token).subscribe(templates => {
      if (templates) {
        this.templates = templates;
        this.check = new Array<boolean>(templates.length);
      }
    })
  }

  Edit() {
    if (this.check) {
      if (this.check.indexOf(true, this.check.indexOf(true) + 1) === -1) {
        let index = this.check.indexOf(true);
        if (index > -1) {
          this.mailService.editingTemplate = this.templates[index];
        } else {
          this.mailService.editingTemplate = null;
        }
        this.router.navigate(['Template','Post'], {replaceUrl: true});
      }
    } else {
      this.mailService.editingTemplate = null;
      this.router.navigate(['Template','Post'], {replaceUrl: true});
    }
  }

  Delete() {
    for (let index = this.templates.length - 1; index >= 0; --index) {
      if (this.check[index]) {
        this.mailService.delete(this.templates[index].id, this.token).subscribe();
        this.templates.splice(index, 1);
        this.check.splice(index, 1);
      }
    }
  }

  Check(template) {
    const index = this.templates.indexOf(template);
    this.check[index] = !this.check[index];
  }
}

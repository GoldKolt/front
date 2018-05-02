import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../model/user';
import {AuthService} from '../auth.service';
import {FormControl, Validators} from '@angular/forms';
import {SignErrorStateMatcher} from '../ErrorStateMatchers/sign-error-state-matcher';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.css'],
  providers: [AuthService]
})
export class SignInDialogComponent {
  loginFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('',[
    Validators.required,
    Validators.minLength(4)
  ]);

  matcher = new SignErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    data.user = new User();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.user && this.data.user.Login && this.data.user.Password) {

      const returnedUser = this.authService.getUser(this.data.user);
      if (returnedUser) {
        this.dialogRef.close(returnedUser);
      } else {
        this.data.user.Password = '';
      }
    } else {
      this.data.user.Password = '';
    }
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { MastersListComponent } from './masters-list/masters-list.component';
import { SignInDialogComponent } from './signin-dialog/signin-dialog.component';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { CookieModule } from 'ngx-cookie';
import { UsersListComponent } from './users-list/users-list.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Services', component: ServicesListComponent },
  { path: 'Masters', component: MastersListComponent }
  // { path: 'admin', component: AdminComponent,
  //   children: [
  //     // { path: 'index' component:  }
  //   ]
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesListComponent,
    MastersListComponent,
    SignInDialogComponent,
    UsersListComponent,
    SignupDialogComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CookieModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialAngularModule
  ],
  entryComponents: [SignInDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


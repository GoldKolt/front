import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Routes, RouterModule, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { MastersListComponent } from './masters-list/masters-list.component';
import { SignInComponent } from './signin/signin.component';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { CookieModule } from 'ngx-cookie';
import { UsersListComponent } from './users-list/users-list.component';
import {UserService} from './users-list/user.service';
import { CarServicesComponent } from './services-list/car-services/car-services.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Services', component: ServicesListComponent },
  { path: 'Service/:id', component: CarServicesComponent },
  { path: 'Masters', component: MastersListComponent },
  { path: 'SignIn', component: SignInComponent }
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
    SignInComponent,
    UsersListComponent,
    CarServicesComponent
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
  entryComponents: [],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }


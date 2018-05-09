import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Routes, RouterModule, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ServicesListComponent } from './car-services/services-list/services-list.component';
import { MastersListComponent } from './masters/masters-list/masters-list.component';
import { SignInComponent } from './signin/signin.component';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { CookieModule } from 'ngx-cookie';
import { UsersListComponent } from './users/users-list/users-list.component';
import {UserService} from './users/user.service';
import { CarServicesComponent } from './car-services/car-services/car-services.component';
import { MasterDetailComponent } from './masters/master-detail/master-detail.component';
import { EditServComponent } from './car-services/edit-serv/edit-serv.component';
import {MasterService} from './masters/master.service';
import {CarServiceDataService} from './car-services/car-service-data.service';
import {SparePartService} from './spare-parts/spare-part.service';
import {RequestService} from './requests/request.service';
import {TypeOperationService} from './type-operations/type-operation.service';
import {OperationService} from './operations/operation.service';
import {ClientService} from './clients/client.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Service/Post', component: EditServComponent },
  { path: 'Services', component: ServicesListComponent},
  { path: 'Service/:id', component: CarServicesComponent },
  { path: 'Masters', component: MastersListComponent },
  { path: 'Master/:id', component: MasterDetailComponent },
  { path: 'SignIn', component: SignInComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesListComponent,
    MastersListComponent,
    SignInComponent,
    UsersListComponent,
    CarServicesComponent,
    MasterDetailComponent,
    EditServComponent
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
  providers: [
    Location,
    UserService,
    CarServiceDataService,
    SparePartService,
    MasterService,
    RequestService,
    TypeOperationService,
    OperationService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


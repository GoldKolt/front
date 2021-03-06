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
import { MasterDetailEditComponent } from './masters/master-detail-edit/master-detail-edit.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientDetailEditComponent } from './clients/client-detail-edit/client-detail-edit.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { TypeOperationsListComponent } from './type-operations/type-operations-list/type-operations-list.component';
import { SparePartsListComponent } from './spare-parts/spare-parts-list/spare-parts-list.component';
import { TypeOperationDetailComponent } from './type-operations/type-operation-detail/type-operation-detail.component';
import { TypeOperationEditComponent } from './type-operations/type-operation-edit/type-operation-edit.component';
import { SparePartDetailComponent } from './spare-parts/spare-part-detail/spare-part-detail.component';
import { SparePartEditComponent } from './spare-parts/spare-part-edit/spare-part-edit.component';
import { OperationsListComponent } from './operations/operations-list/operations-list.component';
import { OperationDetailComponent } from './operations/operation-detail/operation-detail.component';
import { OperationEditComponent } from './operations/operation-edit/operation-edit.component';
import { RequestsListComponent } from './requests/requests-list/requests-list.component';
import { RequestEditComponent } from './requests/request-edit/request-edit.component';
import { SendMailComponent } from './emails/send-mail/send-mail.component';
import { TemplatePostComponent } from './emails/template-post/template-post.component';
import { TemplateListComponent } from './emails/template-list/template-list.component';
import { EmailService } from './emails/email.service';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'Service/Post', component: EditServComponent },
  { path: 'Services', component: ServicesListComponent},
  { path: 'Service/:id', component: CarServicesComponent },
  { path: 'Masters', component: MastersListComponent },
  { path: 'Master/:id', component: MasterDetailComponent },
  { path: 'Clients', component: ClientsListComponent },
  { path: 'Client/:id', component: ClientDetailComponent },
  { path: 'SparePart/Post', component: SparePartEditComponent },
  { path: 'SpareParts', component: SparePartsListComponent },
  { path: 'SparePart/:id', component: SparePartDetailComponent },
  { path: 'TypeOperation/Post', component: TypeOperationEditComponent },
  { path: 'TypeOperations', component: TypeOperationsListComponent},
  { path: 'TypeOperation/:id', component: TypeOperationDetailComponent },
  { path: 'Request/Add', component: RequestEditComponent },
  { path: 'Requests', component: RequestsListComponent },
  { path: 'Operation/Post', component: OperationEditComponent },
  { path: 'Operations', component: OperationsListComponent },
  { path: 'SendMail', component: SendMailComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'Reports', component: ReportsComponent},
  { path: 'Template/Post', component: TemplatePostComponent},
  { path: 'Templates', component: TemplateListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesListComponent,
    MastersListComponent,
    SignInComponent,
    CarServicesComponent,
    MasterDetailComponent,
    EditServComponent,
    MasterDetailEditComponent,
    ClientsListComponent,
    ClientDetailComponent,
    ClientDetailEditComponent,
    ReportsComponent,
    TypeOperationsListComponent,
    SparePartsListComponent,
    TypeOperationDetailComponent,
    TypeOperationEditComponent,
    SparePartDetailComponent,
    SparePartEditComponent,
    OperationsListComponent,
    OperationDetailComponent,
    OperationEditComponent,
    RequestsListComponent,
    RequestEditComponent,
    SendMailComponent,
    TemplatePostComponent,
    TemplateListComponent
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
    ClientService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


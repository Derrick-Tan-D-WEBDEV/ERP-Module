import { TableModule } from 'primeng/table';
import { ViewViewerComponent } from './../../pages/app-sc/user/view-viewer/view-viewer.component';
import { ViewUserComponent } from './../../pages/app-sc/user/view-user/view-user.component';
import { EditViewerComponent } from './../../pages/app-sc/user/edit-viewer/edit-viewer.component';
import { EditUserComponent } from './../../pages/app-sc/user/edit-user/edit-user.component';
import { AddViewerComponent } from './../../pages/app-sc/user/add-viewer/add-viewer.component';
import { AddUserComponent } from './../../pages/app-sc/user/add-user/add-user.component';
import { EditStandardPartComponent } from './../../pages/app-sc/user/edit-standard-part/edit-standard-part.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserLayoutRoutes } from "./user-layout.routing";
import { AppModule } from 'src/app/app.module';
import { DashboardComponent } from 'src/app/pages/app-sc/user/dashboard/dashboard.component';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { QRCodeModule } from 'angularx-qrcode';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ViewStandardPartComponent } from 'src/app/pages/app-sc/user/view-standard-part/view-standard-part.component';
import { AddStandardPartComponent } from 'src/app/pages/app-sc/user/add-standard-part/add-standard-part.component';
import { DataTablesModule } from "angular-datatables";
import { ViewOwnStandardPartComponent } from 'src/app/pages/app-sc/user/view-own-standard-part/view-own-standard-part.component';
import { AddStandardPartMsComponent } from 'src/app/pages/app-sc/user/add-standard-part-ms/add-standard-part-ms.component';
import { ProfileComponent } from 'src/app/pages/app-sc/user/profile/profile.component';
import { ViewOnlyRecoveryComponent } from 'src/app/pages/app-sc/user/view-only-recovery/view-only-recovery.component';
import { ViewRecoveryComponent } from 'src/app/pages/app-sc/user/view-recovery/view-recovery.component';
import { PaginatorModule } from 'primeng/paginator';
import { ViewNewStandardPartComponent } from 'src/app/pages/app-sc/user/view-new-standard-part/view-new-standard-part.component';

import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    QRCodeModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ChartsModule,
    DragDropModule,
    MonacoEditorModule.forRoot(),
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    DataTablesModule
  ],
  declarations: [
    DashboardComponent,
    AddStandardPartComponent,
    ViewStandardPartComponent,
    ViewOwnStandardPartComponent,
    AddStandardPartMsComponent,
    ProfileComponent,
    EditStandardPartComponent,
    AddUserComponent,
    AddViewerComponent,
    EditUserComponent,
    EditViewerComponent,
    ViewUserComponent,
    ViewViewerComponent,
    ViewOnlyRecoveryComponent,
    ViewRecoveryComponent,
    ViewNewStandardPartComponent
  ]
})
export class UserLayoutModule {}

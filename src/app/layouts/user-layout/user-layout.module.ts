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
    DataTablesModule
  ],
  declarations: [
    DashboardComponent,
    AddStandardPartComponent,
    ViewStandardPartComponent,
    ViewOwnStandardPartComponent
  ]
})
export class UserLayoutModule {}

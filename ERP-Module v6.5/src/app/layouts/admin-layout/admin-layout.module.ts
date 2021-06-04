import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { AppModule } from 'src/app/app.module';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { QRCodeModule } from 'angularx-qrcode';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DataTablesModule } from "angular-datatables";
import { DashboardComponent } from 'src/app/pages/app-sc/admin/dashboard/dashboard.component';
import { ViewStandardPartComponent } from 'src/app/pages/app-sc/admin/view-standard-part/view-standard-part.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
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
    ViewStandardPartComponent
  ]
})
export class AdminLayoutModule {}
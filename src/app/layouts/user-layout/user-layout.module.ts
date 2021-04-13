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
    MonacoEditorModule.forRoot()
  ],
  declarations: [
    DashboardComponent
  ]
})
export class UserLayoutModule {}

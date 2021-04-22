import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";


import { AppRoutingModule } from "src/app/app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from "src/app/pages/app-sc/login/login.component";
import { BsDropdownModule, CollapseModule } from "ngx-bootstrap";
import SHA3 from "sha3";
import { AdminLoginComponent } from "src/app/pages/app-sc/admin-login/admin-login.component";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    AdminLoginComponent
  ]
})
export class AuthLayoutModule {}

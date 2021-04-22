import { Routes } from "@angular/router";
import { AdminLoginComponent } from "src/app/pages/app-sc/admin-login/admin-login.component";
import { LoginComponent } from "src/app/pages/app-sc/login/login.component";
export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "admin-login",
        component: AdminLoginComponent
      }
    ]
  }
];

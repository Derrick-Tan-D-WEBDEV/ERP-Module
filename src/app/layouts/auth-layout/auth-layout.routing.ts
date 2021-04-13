import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/pages/app-sc/login/login.component";
import { RegisterComponent } from "src/app/pages/app-sc/register/register.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  }
];

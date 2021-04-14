import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/pages/app-sc/login/login.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  }
];

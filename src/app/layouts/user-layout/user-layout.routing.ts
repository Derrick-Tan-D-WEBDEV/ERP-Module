import { DashboardComponent } from './../../pages/app-sc/user/dashboard/dashboard.component';
import { Routes } from "@angular/router";
import { AuthService as AuthGuard } from './../../services/auth.service';

export const UserLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
        
      }
    ]
  }
];

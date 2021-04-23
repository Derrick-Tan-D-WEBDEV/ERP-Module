import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/pages/app-sc/admin/dashboard/dashboard.component";
import { ViewStandardPartComponent } from "src/app/pages/app-sc/admin/view-standard-part/view-standard-part.component";
import { AuthService as AuthGuard } from './../../services/auth.service';

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'Admin'}
      },
      {
        path: "view-standard-part",
        component: ViewStandardPartComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'Admin'}
      }
    ]
  }
];

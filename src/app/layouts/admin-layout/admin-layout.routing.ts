import { Routes } from "@angular/router";
import { DashboardComponent } from "src/app/pages/app-sc/admin/dashboard/dashboard.component";
import { ViewStandardPartComponent } from "src/app/pages/app-sc/admin/view-standard-part/view-standard-part.component";


export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "view-standard-part",
        component: ViewStandardPartComponent
      }
    ]
  }
];

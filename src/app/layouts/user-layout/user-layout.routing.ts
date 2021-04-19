import { DashboardComponent } from './../../pages/app-sc/user/dashboard/dashboard.component';
import { Routes } from "@angular/router";
import { AuthService as AuthGuard } from './../../services/auth.service';
import { ViewStandardPartComponent } from 'src/app/pages/app-sc/user/view-standard-part/view-standard-part.component';
import { AddStandardPartComponent } from 'src/app/pages/app-sc/user/add-standard-part/add-standard-part.component';
import { ViewOwnStandardPartComponent } from 'src/app/pages/app-sc/user/view-own-standard-part/view-own-standard-part.component';
import { AddStandardPartMsComponent } from 'src/app/pages/app-sc/user/add-standard-part-ms/add-standard-part-ms.component';

export const UserLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent       
      },
      {
        path: "view-standard-part",
        component: ViewStandardPartComponent       
      },
      {
        path: "add-standard-part",
        component: AddStandardPartComponent
      },
      {
        path: "view-own-standard-part",
        component: ViewOwnStandardPartComponent
      },
      {
        path: "add-standard-part-ms",
        component: AddStandardPartMsComponent
      },
    ]
  }
];

import { EditUserComponent } from './../../pages/app-sc/user/edit-user/edit-user.component';
import { EditViewerComponent } from './../../pages/app-sc/user/edit-viewer/edit-viewer.component';
import { AddViewerComponent } from './../../pages/app-sc/user/add-viewer/add-viewer.component';
import { AddUserComponent } from './../../pages/app-sc/user/add-user/add-user.component';
import { EditStandardPartComponent } from '../../pages/app-sc/user/edit-standard-part/edit-standard-part.component';
import { DashboardComponent } from './../../pages/app-sc/user/dashboard/dashboard.component';
import { Routes } from "@angular/router";
import { AuthService as AuthGuard } from './../../services/auth.service';
import { ViewStandardPartComponent } from 'src/app/pages/app-sc/user/view-standard-part/view-standard-part.component';
import { AddStandardPartComponent } from 'src/app/pages/app-sc/user/add-standard-part/add-standard-part.component';
import { ViewOwnStandardPartComponent } from 'src/app/pages/app-sc/user/view-own-standard-part/view-own-standard-part.component';
import { AddStandardPartMsComponent } from 'src/app/pages/app-sc/user/add-standard-part-ms/add-standard-part-ms.component';
import { ProfileComponent } from 'src/app/pages/app-sc/user/profile/profile.component';
import { ViewUserComponent } from 'src/app/pages/app-sc/user/view-user/view-user.component';
import { ViewViewerComponent } from 'src/app/pages/app-sc/user/view-viewer/view-viewer.component';

export const UserLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "view-standard-part",
        component: ViewStandardPartComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "add-standard-part",
        component: AddStandardPartComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "view-own-standard-part",
        component: ViewOwnStandardPartComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "add-standard-part-ms",
        component: AddStandardPartMsComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "edit-standard-part/:id/:is_sub",
        component: EditStandardPartComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "add-user",
        component: AddUserComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "add-viewer",
        component: AddViewerComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "edit-user",
        component: EditUserComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "edit-viewer",
        component: EditViewerComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "view-user",
        component: ViewUserComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      },
      {
        path: "view-viewer",
        component: ViewViewerComponent,
        canActivate:[AuthGuard],
        data: {expectedRole:'User'}
      }
    ]
  }
];

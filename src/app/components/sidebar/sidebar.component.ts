import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

var misc: any = {
  sidebar_mini_active: true
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}

export const ROUTES_USER: RouteInfo[] = [
  {
    path: "/user/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-th-large text-primary",
  },
  {
    path: "/user/view-standard-part",
    title: "View Standard Part",
    type: "link",
    icontype: "far fa-eye text-primary",
  },
  {
    path: "/user/view-own-standard-part",
    title: "View Own Standard Part",
    type: "link",
    icontype: "far fa-eye text-primary",
  }
];

export const ROUTES_ADMIN: RouteInfo[] = [
  {
    path: "/admin/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-th-large text-primary",
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  public id:any;
  public api_key:any;
  public role:any;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this.id = this._authService.getUserID();
    this.api_key = this._authService.getAccessToken();
    this.role = this._authService.getRole();
    if(this.role == "User"){
      this.menuItems = ROUTES_USER.filter(menuItem => menuItem);
      this.router.events.subscribe(event => {
        this.isCollapsed = true;
      });

    }else if(this.role == "Admin"){
      this.menuItems = ROUTES_ADMIN.filter(menuItem => menuItem);
      this.router.events.subscribe(event => {
        this.isCollapsed = true;
      });
    }
  }
  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}

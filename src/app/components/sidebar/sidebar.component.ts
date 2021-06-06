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

export const ROUTES_ADMIN: RouteInfo[] = [
  {
    path: "/user/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-th-large text-primary",
  },
  {
    path: "/user",
    title: "View",
    type: "sub",
    icontype: "fas fa-eye text-primary",
    collapse: "owned-company",
    isCollapsed: true,
    children: [
      { path: "view-standard-part", title: "Standard Part", type: "link" },
      { path: "view-own-standard-part", title: "Own Standard Part", type: "link" },
      { path: "view-user", title: "User", type: "link" },
      { path: "view-viewer", title: "Viewer", type: "link" },
      { path: "view-recovery", title: "Deleted Data", type: "link" }
    ]
  },
  {
    path: "/user",
    title: "Add",
    type: "sub",
    icontype: "fas fa-plus text-primary",
    collapse: "owned-company",
    isCollapsed: true,
    children: [
      { path: "add-standard-part", title: "Standard Part", type: "link" },
      { path: "add-standard-part-ms", title: "Customized Standard Part", type: "link" },
      { path: "add-user", title: "User", type: "link" },
      { path: "add-viewer", title: "Viewer", type: "link" }
    ]
  },
  {
    path: "/user/profile",
    title: "Profile",
    type: "link",
    icontype: "far fa-user text-primary",
  }
];

export const ROUTES_USER: RouteInfo[] = [
  {
    path: "/user/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-th-large text-primary",
  },
  {
    path: "/user",
    title: "View",
    type: "sub",
    icontype: "fas fa-eye text-primary",
    collapse: "owned-company",
    isCollapsed: true,
    children: [
      { path: "view-standard-part", title: "Standard Part", type: "link" },
      { path: "view-own-standard-part", title: "Own Standard Part", type: "link" },
      { path: "view-viewer", title: "Viewer", type: "link" },
      { path: "view-only-recovery", title: "Deleted Data", type: "link" }
    ]
  },
  {
    path: "/user",
    title: "Add",
    type: "sub",
    icontype: "fas fa-plus text-primary",
    collapse: "owned-company",
    isCollapsed: true,
    children: [
      { path: "add-standard-part", title: "Standard Part", type: "link" },
      { path: "add-standard-part-ms", title: "Customized Standard Part", type: "link" },
      { path: "add-viewer", title: "Viewer", type: "link" }
    ]
  },
  {
    path: "/user/profile",
    title: "Profile",
    type: "link",
    icontype: "far fa-user text-primary",
  }
];

export const ROUTES_VIEWER: RouteInfo[] = [
  {
    path: "/user/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-th-large text-primary",
  },
  {
    path: "/user",
    title: "View",
    type: "sub",
    icontype: "fas fa-eye text-primary",
    collapse: "owned-company",
    isCollapsed: true,
    children: [
      { path: "view-standard-part", title: "Standard Part", type: "link" },
      { path: "view-only-recovery", title: "Deleted Data", type: "link" }
    ]
  },
  {
    path: "/user/profile",
    title: "Profile",
    type: "link",
    icontype: "far fa-user text-primary",
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
    this.role = this._authService.getActionRole();
    console.log(this._authService.getVersion());
    if(this._authService.getVersion() != 'v6.5.1'){
      this.router.navigate(['/user/login']);
    }
    console.log(this.role);
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
    else if(this.role == "Viewer"){
      this.menuItems = ROUTES_VIEWER.filter(menuItem => menuItem);
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

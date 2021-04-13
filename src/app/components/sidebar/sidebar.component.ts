import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
//Menu Items
// export const ROUTES: RouteInfo[] = [
//   {
//     path: "/dashboards",
//     title: "Dashboards",
//     type: "sub",
//     icontype: "ni-shop text-primary",
//     isCollapsed: true,
//     children: [
//       { path: "dashboard", title: "Dashboard", type: "link" },
//       { path: "alternative", title: "Alternative", type: "link" }
//     ]
//   },
//   {
//     path: "/forms",
//     title: "Forms",
//     type: "sub",
//     icontype: "ni-single-copy-04 text-pink",
//     collapse: "forms",
//     isCollapsed: true,
//     children: [
//       { path: "elements", title: "Elements", type: "link" },
//       { path: "components", title: "Components", type: "link" },
//       { path: "validation", title: "Validation", type: "link" }
//     ]
//   },
//   {
//     path: "/widgets",
//     title: "Widgets",
//     type: "link",
//     icontype: "ni-archive-2 text-green"
//   }
// ];

export const ROUTES: RouteInfo[] = [
  {
    path: "/user/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "fas fa-th-large text-primary",
  },
  {
    path: "/user",
    title: "Visualization",
    type: "sub",
    icontype: "fas fa-chart-bar text-primary",
    collapse: "charts",
    isCollapsed: true,
    children: [
      { path: "list-data", title: "Data", type: "link" },
      { path: "list-charts", title: "Charts", type: "link" },  
      { path: "list-dashboards", title: "Dashboard", type: "link" }
    ]
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
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

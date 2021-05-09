import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import TimelinesChart from 'timelines-chart';
import * as d3 from "d3";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  id:any;
  api_key:any;

  constructor(private _authService: AuthService,private router:Router,private apollo: Apollo) {
    
  }

  ngOnInit(): void {
    this.id = this._authService.getUserID();
    this.api_key = this._authService.getAccessToken();
  }

  public chartClicked(e: any): void {
    console.log(e.active[0]._index);
  }

}

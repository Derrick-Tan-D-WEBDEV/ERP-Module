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


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public radarChartType = 'radar';

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

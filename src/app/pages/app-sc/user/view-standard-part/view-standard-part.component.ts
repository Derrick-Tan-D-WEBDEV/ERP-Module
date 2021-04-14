import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-view-standard-part',
  templateUrl: './view-standard-part.component.html',
  styleUrls: ['./view-standard-part.component.scss']
})
export class ViewStandardPartComponent implements OnInit {

  standard_parts:any; 
  dtOptions: DataTables.Settings = {};

  tableDataReady:any = 0;
  constructor(private _chRef: ChangeDetectorRef,private _standardPartService:StandardPartsService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllSPByUserID();
    this.dtOptions = {
      pagingType: 'full_numbers',
      scrollX: true
    };
    
  }

  getAllSPByUserID(){
    this._standardPartService.getAllSP().subscribe((response) => {
      this.standard_parts = response;
      this.tableDataReady = 1;
      console.log(response);
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to login!</span> <span data-notify="message">Please check your credentials! Please contact the support, if needed!</span></div>',
        "",
        {
          timeOut: 1000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-bottom-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-danger alert-notify"
        }
      );
    });
  }


}

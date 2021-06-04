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
  selector: 'app-view-own-standard-part',
  templateUrl: './view-own-standard-part.component.html',
  styleUrls: ['./view-own-standard-part.component.scss']
})
export class ViewOwnStandardPartComponent implements OnInit {
  standard_parts:any; 
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  tableDataReady:any = 0;

  id:any;
  constructor(private _chRef: ChangeDetectorRef,private _standardPartService:StandardPartsService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    var auth_role = ["Admin","User"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.id = this._authService.getUserID();
    console.log(this.id);
    this.getAllSPByUserID();
    this.dtOptions = {
      pagingType: 'full_numbers',
      scrollX: true
    };
    this.tableDataReady = 1;
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  editSP(id,erp_code){
    const substring = ".";
    console.log(erp_code);
    if(erp_code.includes(substring)){
      this.router.navigateByUrl('/user/edit-standard-part/'+id+'/1');
    }
    else{
      this.router.navigateByUrl('/user/edit-standard-part/'+id+'/0');
    }
  }


  deleteSP(id){
    this._standardPartService.deleteSP(id).subscribe((response) => {
      console.log(response);
      // var val = (<HTMLInputElement>document.getElementById("category_id")).value;
      this.getAllSPByUserID();
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Successfully delete standard part!</span> <span data-notify="message">Nice!</span></div>',
        "",
        {
          timeOut: 1000,
          closeButton: true,
          enableHtml: true,
          tapToDismiss: false,
          titleClass: "alert-title",
          positionClass: "toast-bottom-center",
          toastClass:
            "ngx-toastr alert alert-dismissible alert-success alert-notify"
        }
      ); 
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to delete!</span> <span data-notify="message">Please contact the support, if needed!</span></div>',
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


  getAllSPByUserID(){
    this._standardPartService.getSPByUserID(this.id).subscribe((response) => {
      console.log(response);
      this.standard_parts = response;
      this.tableDataReady = 1;
      this.rerender();
    },
    error => {
      this.tableDataReady = 1;
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

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}

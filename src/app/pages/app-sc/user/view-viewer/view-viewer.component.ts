import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import { DataTableDirective } from 'angular-datatables';
import { StandardPartCategoryService } from 'src/app/services/standard-part-category.service';

@Component({
  selector: 'app-view-viewer',
  templateUrl: './view-viewer.component.html',
  styleUrls: ['./view-viewer.component.scss']
})
export class ViewViewerComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  standard_parts:any; 
  actionRole:any;
  sp_category:any;
  tableDataReady:any = 0;
  constructor(private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _standardPartService:StandardPartsService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.actionRole = this._authService.getActionRole();
    console.log(this.actionRole);
    this.dtOptions = {
      pagingType: 'full_numbers',
      scrollX: true
    };
    this.getAllSP();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  getAllSP(){
    this.tableDataReady = 0;
    this._standardPartService.getAllSP().subscribe((response) => {
      this.standard_parts = response;
      this.rerender();
      this.tableDataReady = 1;
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
      var val = (<HTMLInputElement>document.getElementById("category_id")).value;
      // if(val){
      //   this.getSPByCatID(val);
      // }
      // else{
      //   this.getAllSP();
      // }
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to delete!</span> <span data-notify="message">Please check your credentials! Please contact the support, if needed!</span></div>',
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

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
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-standard-part',
  templateUrl: './view-standard-part.component.html',
  styleUrls: ['./view-standard-part.component.scss']
})
export class ViewStandardPartComponent implements OnInit,AfterViewInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  standard_parts:any; 
  actionRole:any;
  sp_category:any;
  tableDataReady:any = 0;
  constructor(private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _standardPartService:StandardPartsService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    var auth_role = ["Admin","User","Viewer"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.actionRole = this._authService.getActionRole();
    console.log(this.actionRole);
    this.dtOptions = {
      pagingType: 'full_numbers',
      scrollX: true
    };
    this.getAllSP();
    this.getAllSPCategory();
  }

  categoryOnChange(val){

    if(val){
      this.getSPByCatID(val);
    }
    else{
      this.getAllSP();
    }

  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  getAllSP(){
    this.tableDataReady = 0;
    this._standardPartService.getAllSP().subscribe((response) => {
      console.log(response)
      this.standard_parts = response.result;
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

  getAllSPCategory(){
    this._standardPartCategoryService.getAllSPCategory().subscribe((response) => {
      this.sp_category = response;
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve category!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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

  getSPByCatID(cat_id){
    this.tableDataReady = 0;
    this._standardPartService.getSPByCatID(cat_id).subscribe((response) => {
      this.standard_parts = response.result;
      this.rerender();
      this.tableDataReady = 1;
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve category!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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
    // @ts-ignore
    Swal.fire({
      title: 'Do you sure want to continue to delete this part?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Confirm`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if(result.value){
        this._standardPartService.deleteSP(id).subscribe((response) => {
          console.log(response);
          var val = (<HTMLInputElement>document.getElementById("category_id")).value;
          if(val){
            this.getSPByCatID(val);
          }
          else{
            this.getAllSP();
          }
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
      else{
        Swal.fire('Action Canceled!', '', 'info');
      }
    });

  }


  export_excel(){
    var element = document.createElement('a');
    element.setAttribute('href', 'http://192.168.0.24:4000/SP/SPfiles');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
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

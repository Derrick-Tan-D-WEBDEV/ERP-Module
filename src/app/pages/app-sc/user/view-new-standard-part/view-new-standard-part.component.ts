import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/services/auth.service';
import { StandardPartCategoryService } from 'src/app/services/standard-part-category.service';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-new-standard-part',
  templateUrl: './view-new-standard-part.component.html',
  styleUrls: ['./view-new-standard-part.component.scss']
})
export class ViewNewStandardPartComponent implements OnInit {
  standard_parts: any[];
  sp_category:any[];
  actionRole:any

  loading: boolean = true;

  @ViewChild('dt') table: Table;

  constructor( private _standardPartCategoryService: StandardPartCategoryService,private _authService:AuthService,private router:Router,private _toastrService: ToastrService, private _standardPartService:StandardPartsService ,private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    var auth_role = ["Admin","User","Viewer"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.actionRole = this._authService.getActionRole();

    this.primengConfig.ripple = true;
    this.getAllSP();
    this.getAllSPCategory();
  }

  getAllSP(){
    this.loading = true;
    this._standardPartService.getAllSP().subscribe((response) => {
        console.log(response)
        this.standard_parts = response.result;
        this.loading = false;
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
    this.loading = true;
    this._standardPartService.getSPByCatID(cat_id).subscribe((response) => {
      this.standard_parts = response.result;
      this.loading = false;
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

  categoryOnChange(val){

    if(val){
      this.getSPByCatID(val);
    }
    else{
      this.getAllSP();
    }

  }

  clear(table: Table) {
    table.clear();
  }

}

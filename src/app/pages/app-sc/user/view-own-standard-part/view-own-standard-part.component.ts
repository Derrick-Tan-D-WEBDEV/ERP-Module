import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-own-standard-part',
  templateUrl: './view-own-standard-part.component.html',
  styleUrls: ['./view-own-standard-part.component.scss']
})
export class ViewOwnStandardPartComponent implements OnInit {
  standard_parts:any; 

  id:any;
  loading: boolean = true;
  constructor(private _chRef: ChangeDetectorRef,private _standardPartService:StandardPartsService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    var auth_role = ["Admin","User"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.id = this._authService.getUserID();
    console.log(this.id);
    this.getAllSPByUserID();
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
      } else{
        Swal.fire('Action Canceled!', '', 'info')
      }

    });

  }


  getAllSPByUserID(){
    this.loading = true;
    this._standardPartService.getSPByUserID(this.id).subscribe((response) => {
      console.log(response);
      this.standard_parts = response;
      this.loading = false;
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve!</span> <span data-notify="message">Please contact the support, if needed!</span></div>',
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

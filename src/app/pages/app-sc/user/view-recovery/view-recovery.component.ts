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
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-recovery',
  templateUrl: './view-recovery.component.html',
  styleUrls: ['./view-recovery.component.scss']
})
export class ViewRecoveryComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  standard_parts:any; 
  actionRole:any;
  loading:boolean = true;
  constructor(private _chRef: ChangeDetectorRef,private _employeeService:EmployeeService,private _standardPartService:StandardPartsService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    var auth_role = ["Admin"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.actionRole = this._authService.getActionRole();
    console.log(this.actionRole);
    this.getAllRecovery();
  }


  getAllRecovery(){
    this.loading = true;
    this._standardPartService.getAllRecovery().subscribe((response) => {
      this.standard_parts = response.result;
      this.loading = false;
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve recovery data!</span> <span data-notify="message">Please contact the support, if needed!</span></div>',
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

  recover(id){
    // @ts-ignore
    Swal.fire({
      title: 'Do you sure want to continue to recover this part?',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Confirm`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if(result.value){
        this._standardPartService.recover(id).subscribe((response) => {
          if(response.status){
            this._toastrService.show(
              '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Success recover data!</span> <span data-notify="message">Please contact the support, if needed!</span></div>',
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
            this.getAllRecovery();
          }
        },
        error => {
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to recover data!</span> <span data-notify="message">Please contact the support, if needed!</span></div>',
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
        
      }
    });

  }

}

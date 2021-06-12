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

@Component({
  selector: 'app-view-viewer',
  templateUrl: './view-viewer.component.html',
  styleUrls: ['./view-viewer.component.scss']
})
export class ViewViewerComponent implements OnInit {
  loading:boolean = true;
  viewer:any; 
  actionRole:any;
  constructor(private _chRef: ChangeDetectorRef,private _employeeService:EmployeeService,private _standardPartService:StandardPartsService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    var auth_role = ["Admin","User"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.actionRole = this._authService.getActionRole();
    console.log(this.actionRole);
    this.getAllViewer();
  }


  getAllViewer(){
    this.loading = true;
    this._employeeService.getAllViewer().subscribe((response) => {
      this.viewer = response.allViewer;
      this.loading= false;
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve viewer!</span> <span data-notify="message">Please contact the support, if needed!</span></div>',
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

  editViewer(id){
    this.router.navigateByUrl('/user/edit-viewer/'+id);
  }

  deleteViewer(id){
    this._employeeService.deleteViewer(id).subscribe((response) => {
      console.log(response);
      this.getAllViewer();
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Successfully delete viewer!</span> <span data-notify="message">Nice!</span></div>',
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


}

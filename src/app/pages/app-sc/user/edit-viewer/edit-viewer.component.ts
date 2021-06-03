import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import { DataTableDirective } from 'angular-datatables';
import { StandardPartCategoryService } from 'src/app/services/standard-part-category.service';
import { StandardPartTypeItemService } from 'src/app/services/standard-part-type-item.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-viewer',
  templateUrl: './edit-viewer.component.html',
  styleUrls: ['./edit-viewer.component.scss']
})
export class EditViewerComponent implements OnInit {
  id:any;
  editForm: FormGroup;
  isSubmitted:boolean;
  constructor(private route: ActivatedRoute,private _employeeService:EmployeeService,private _standardPartService:StandardPartsService,private _stadardPartTypeItemService:StandardPartTypeItemService,private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getOneViewer(this.id);
    this.editForm =  this.formBuilder.group({
      emp_id: ['', Validators.required],
      fullname: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.editForm.controls
  }

  edit(values){
    this.isSubmitted = true;

    if(this.editForm.invalid){
      return;
    }
    else{
      this._employeeService.editUser(this.id, values.emp_id,values.email, values.fullname,values.name).subscribe((response) => {

        if(response.status){
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Successfully edit viewer!</span> <span data-notify="message">Nice!</span></div>',
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
          ).onHidden.pipe(take(1)).subscribe(()=>this.router.navigate(['user/dashboard']));          
          this.editForm.reset();    
          this.isSubmitted = false;
        }
        else{
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">'+response.message+'</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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
        }
      },
      error => {
        this._toastrService.show(
          '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to edit viewer!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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

  getOneViewer(id){
    this._employeeService.getUserbyID(id).subscribe((response) => {
      console.log(response);
      if(response.length == 0){
        alert("Can't Find User ID!");
        this.router.navigateByUrl('/user/dashbaord');
      }else{

        this.editForm.patchValue({
          emp_id: response.user.employeeID,
          fullname: response.user.fullname,
          name: response.user.fullname,
          email: response.user.email
        })
      }

      
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve viewer!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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

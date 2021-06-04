import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id:any;
  view_pUsername:any;
  view_pFullname:any;
  view_pEmployeeID:any;
  view_pEmail:any;

  updatePasswordForm:FormGroup;
  isSubmitted:boolean;
  constructor(private formBuilder:FormBuilder,private _employeeService:EmployeeService,private _toastrService:ToastrService, private router:Router, private _authService:AuthService) { }

  ngOnInit() {
    var auth_role = ["Admin","User","Viewer"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.id = this._authService.getUserID();
    this.getOneUser();
    this.updatePasswordForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required]
    }); 
  }

  get f_pwd() {
    return this.updatePasswordForm.controls;
  }

  getOneUser(){
    this._employeeService.getUserbyID(this.id).subscribe(response => {
      if(response['status'] == true){
        console.log(response.user);
        this.view_pFullname = response.user.fullname;
        this.view_pUsername = response.user.name;
        this.view_pEmployeeID = response.user.employeeID;
        this.view_pEmail = response.user.email;
      }
      else{
        this._toastrService.show(
          '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve!</span> <span data-notify="message">Please contact the super administrator, if needed!</span></div>',
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
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve!</span> <span data-notify="message">Please contact the super administrator, if needed!</span></div>',
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

  updatePassword(value){
    this.isSubmitted = true;
    if(this.updatePasswordForm.invalid){
      return;
    }
    else{

      this._employeeService.updatePassword(this.id,value.new_password,value.old_password).subscribe(response => {

        if(response['status'] == true){
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Password Successfully Update!</span> <span data-notify="message">Nice!</span></div>',
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
          this.updatePasswordForm.reset();
          this.isSubmitted = false;
        }
        else{
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to Update!</span> <span data-notify="message">Please contact the super administrator, if needed!</span></div>',
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
          '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to Update!</span> <span data-notify="message">Please contact the super administrator, if needed!</span></div>',
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

}

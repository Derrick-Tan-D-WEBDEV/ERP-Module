import { SHA3 } from 'sha3';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public focus;
  public focus1;
  loginForm: FormGroup;
  loginPrompt:String;
  result_json:any;
  isSubmitted:boolean;
  _role:String;
  constructor(private _adminService: AdminService, private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this._role = this._authService.getRole();
    if(this._authService.isAuthenticated()){
      if(this._authService.getRole() == "User"){
        this.router.navigate(['user/dashboard']);
      }
      else if(this._authService.getRole() == "Admin"){
        this.router.navigate(['admin/dashboard']);
      }
    }else{
      console.log("Please Log in")
    }
    
    this.loginForm =  this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls
  }

  login(value){
    this.loginPrompt = "";
    this.isSubmitted = true;

    if(this.loginForm.invalid){
      return;
    }
    else{
      this._adminService.login(value.username,value.password).subscribe((response) => {
        if(response.status == true){
          console.log(response);
          this._authService.setAccessToken(response.accessToken);
          this._authService.setUsername(response.name);
          this._authService.setRole("Admin");
          this._authService.setID(response.id);
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Login Success!</span> <span data-notify="message">Welcome back to Greatech ERP.S!</span></div>',
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
          ).onHidden.pipe(take(1)).subscribe(()=>this.router.navigate(['admin/dashboard']));
          
        }else{
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
        }
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

}

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import { DataTableDirective } from 'angular-datatables';
import { StandardPartCategoryService } from 'src/app/services/standard-part-category.service';

@Component({
  selector: 'app-add-standard-part',
  templateUrl: './add-standard-part.component.html',
  styleUrls: ['./add-standard-part.component.scss']
})
export class AddStandardPartComponent implements OnInit {
  sp_category:any;
  addForm: FormGroup;
  constructor(private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllSPCategory();
    this.addForm =  this.formBuilder.group({
      sp_category: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.addForm.controls
  }

  add(){

  }

  getAllSPCategory(){
    this._standardPartCategoryService.getAllSPCategory().subscribe((response) => {
      this.sp_category = response;
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

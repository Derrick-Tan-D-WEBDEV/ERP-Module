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
  constructor(private _standardPartService:StandardPartsService,private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllSPCategory();
    this.addForm =  this.formBuilder.group({
      sp_category: ['', Validators.required],
      type_item: ['', Validators.required],
      product_part_number: ['', Validators.required],
      greatech_drawing_naming: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      uom: ['', Validators.required],
      remark: ['', Validators.required],
      assign_material: ['', Validators.required],
      assign_weight: ['', Validators.required]
    });
  }

  get f() {
    return this.addForm.controls
  }

  add(values){
    values["user_id"] = this._authService.getUserID();
    console.log(values);
    this._standardPartService.addSP(values).subscribe((response) => {
      console.log(response);
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


}

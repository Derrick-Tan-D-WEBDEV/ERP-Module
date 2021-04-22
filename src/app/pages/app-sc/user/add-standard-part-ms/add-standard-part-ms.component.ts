import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import { DataTableDirective } from 'angular-datatables';
import { StandardPartCategoryService } from 'src/app/services/standard-part-category.service';

@Component({
  selector: 'app-add-standard-part-ms',
  templateUrl: './add-standard-part-ms.component.html',
  styleUrls: ['./add-standard-part-ms.component.scss']
})
export class AddStandardPartMsComponent implements OnInit {
  sp_category:any;
  addForm: FormGroup;
  isSubmitted:boolean;
  constructor(private _standardPartService:StandardPartsService,private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllSPCategory();
    
    this.addForm =  this.formBuilder.group({
      sp_category: ['', Validators.required],//this
      type_item: ['', Validators.required],
      product_part_number: ['', Validators.required], 
      greatech_drawing_naming: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      uom: ['', Validators.required],
      remark: ['', Validators.required],
      assign_material: ['', Validators.required],
      assign_weight: ['', Validators.required],
      folder_location: ['', Validators.required],
      subs: this.formBuilder.array([])
    });
    this.addSub();
  }
  
  get f_sub() :FormArray {
    return this.addForm.get("subs") as FormArray
  }

  get f() {
    return this.addForm.controls
  }

  newSub(): FormGroup {
    return this.formBuilder.group({
      type_item: ['', Validators.required],
      product_part_number: ['', Validators.required], 
      greatech_drawing_naming: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      uom: ['', Validators.required],
      remark: ['', Validators.required],
      assign_material: ['', Validators.required],
      assign_weight: ['', Validators.required]
    })
  }

  addSub() {
    this.f_sub.push(this.newSub());
  }
  
  removeSub(i:number) {
    this.f_sub.removeAt(i);
  }

  add(values){
    this.isSubmitted = true;
    values["user_id"] = this._authService.getUserID();
    console.log(values);
    if(this.addForm.invalid){
      return;
    }
    else{
      this._standardPartService.addSPMS(values).subscribe((response) => {
        console.log(response);
        if(response.status){
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Successfully add standard parts!</span> <span data-notify="message">Nice!</span></div>',
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
          this.addForm.reset();    
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
          '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to add standard parts!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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

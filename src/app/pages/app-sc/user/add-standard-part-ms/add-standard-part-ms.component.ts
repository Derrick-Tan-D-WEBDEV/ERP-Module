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
import { StandardPartTypeItemService } from 'src/app/services/standard-part-type-item.service';

@Component({
  selector: 'app-add-standard-part-ms',
  templateUrl: './add-standard-part-ms.component.html',
  styleUrls: ['./add-standard-part-ms.component.scss']
})
export class AddStandardPartMsComponent implements OnInit {
  sp_category:any;
  sp_typeitem:any;
  addForm: FormGroup;
  isSubmitted:boolean;
  
  sp_typeitem_index:any =[];
  temp_typeitem:any = {};
  constructor(private _standardPartService:StandardPartsService,private _stadardPartTypeItemService:StandardPartTypeItemService,private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

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
  
  typeItemOnChange(val){
    if(val){
      this.getAllTypeItem(val);
    }
    else{
      this.sp_category.removeAt();
    }

  }
  
  typeItemOnChangeIndex(i,val){
    if(val){
      this.getAllTypeItem(val);
      this.sp_typeitem_index[i] = this.temp_typeitem;
      this.temp_typeitem = {};
    }
  }

  get f_sub() :FormArray {
    return this.addForm.get("subs") as FormArray
  }

  get f() {
    return this.addForm.controls
  }

  newSub(): FormGroup {
    return this.formBuilder.group({
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
    })
  }

  addSub() {
    this.sp_typeitem_index.push({});
    this.f_sub.push(this.newSub());
    console.log(this.sp_typeitem_index);
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

  getAllTypeItem(sp_id, type = null){
    this._stadardPartTypeItemService.getAllSPByCategoryId(sp_id).subscribe((response) => {
      if(type == null)
        this.sp_typeitem = response.result;
      else
        this.sp_typeitem_index = response.result;
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

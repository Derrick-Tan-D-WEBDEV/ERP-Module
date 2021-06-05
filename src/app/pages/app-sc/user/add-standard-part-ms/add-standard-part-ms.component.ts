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
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-standard-part-ms',
  templateUrl: './add-standard-part-ms.component.html',
  styleUrls: ['./add-standard-part-ms.component.scss']
})
export class AddStandardPartMsComponent implements OnInit {
  sp_category:any;
  sp_typeitem:any;
  sp_uom:any;
  addForm: FormGroup;
  isSubmitted:boolean;
  
  sp_typeitem_index:any =[];
  temp_typeitem:any = {};
  constructor(private _standardPartService:StandardPartsService,private _stadardPartTypeItemService:StandardPartTypeItemService,private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    var auth_role = ["Admin","User"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    // this.getAllSPCategory();
    this.getAllSPUOM();
    this.addForm =  this.formBuilder.group({
      sp_category: ['Customize Standard Parts', Validators.required],//this
      type_item: ['', Validators.required],
      product_part_number: ['', [Validators.pattern('^[a-zA-Z0-9 \-\'Ø+_&/\\().,#]+'),Validators.required]], 
      greatech_drawing_naming: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', [Validators.pattern('^[a-zA-Z0-9 \-\'Ø+_&/\\().,#]+'),Validators.required]],
      uom: ['', Validators.required],
      remark: [''],
      assign_material: ['', Validators.required],
      assign_weight: ['', Validators.required],
      folder_location: ['', Validators.required],
      subs: this.formBuilder.array([])
    });
    this.addSub();
  }
  
  typeItemOnChange(val){
    // if(val){
    //   this.getAllTypeItem(val);
    // }
    // else{
    //   this.sp_category.removeAt();
    // }

  }
  
  typeItemOnChangeIndex(i,val){
    // console.log(val);
    // if(val){
    //   this.getAllTypeItem(val,"");
    //   this.sp_typeitem_index[i] = this.temp_typeitem;
    //   this.temp_typeitem = {};
    //   console.log(this.sp_typeitem_index);
    // }
  }

  get f_sub() :FormArray {
    return this.addForm.get("subs") as FormArray
  }

  get f() {
    return this.addForm.controls
  }

  newSub(): FormGroup {
    return this.formBuilder.group({
      sp_category: ['Customize Standard Parts', Validators.required],
      type_item: ['', Validators.required],
      product_part_number: ['', [Validators.pattern('^[a-zA-Z0-9 \-\'Ø+_&/\\().,#-]+'),Validators.required]], 
      greatech_drawing_naming: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', [Validators.pattern('^[a-zA-Z0-9 \-\'Ø+_&/\\().,#-]+'),Validators.required]],
      uom: ['', Validators.required],
      remark: [''],
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
      // @ts-ignore
      Swal.fire({
        title: 'Do sure you want to continue to add customized part?',
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        console.log(result);
        if (result.value) {
          
          this._standardPartService.addSPMS(values).subscribe((response) => {
            console.log(response);
            if(response.status){
              var full_html = `<div class="text-center">
              <h4>Main</h4>
              <div><b>Part No:</b> </div><input style='border:none;text-align:center;' value="`+response.main.part_number+`" onclick="this.select();"  readonly="readonly"/>
              <div><b>ERP Code:</b> </div><input style='border:none;text-align:center;' value="`+response.main.erp_code+`" onclick="this.select();" readonly="readonly"/>
              <hr>
              <h4>Sub</h4>`;
              var count = 0;
              for(let sub of response.main.sub){
                full_html += `<small style="font-size:12px">`+"Sub #"+count+`</small>`;
                full_html += `
                <div><b>Part No:</b> </div><input style='border:none;text-align:center;' value="`+sub.part_number+`" onclick="this.select();"  readonly="readonly"/>
                <div><b>ERP Code:</b> </div><input style='border:none;text-align:center;' value="`+sub.erp_code+`" onclick="this.select();" readonly="readonly"/>`;
                count ++;
              }
              full_html += `</div>`;
              console.log(full_html);
              // @ts-ignore
              Swal.fire({
                title: "Following Customized Parts Added:",
                html: full_html,
                type: "info"
              });
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
        else{

        }
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
        this.temp_typeitem = response.result;
      console.log(this.temp_typeitem)
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

  getAllSPUOM(){
    this._standardPartService.getAllUOM().subscribe((response) => {
      this.sp_uom = response.result;
      console.log(this.sp_uom);
    },
    error => {
      this._toastrService.show(
        '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to retrieve uom!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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

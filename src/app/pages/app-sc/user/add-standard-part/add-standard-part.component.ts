import Swal from 'sweetalert2';
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
import { StandardPartTypeItemService } from 'src/app/services/standard-part-type-item.service';
import { HttpResponseBase } from '@angular/common/http';


@Component({
  selector: 'app-add-standard-part',
  templateUrl: './add-standard-part.component.html',
  styleUrls: ['./add-standard-part.component.scss']
})
export class AddStandardPartComponent implements OnInit {
  sp_category:any;
  sp_typeitem:any;
  sp_uom:any;
  addForm: FormGroup;
  isSubmitted:boolean;
  category_id:any = 0;
  productHandle:any = false;
  constructor(private _standardPartService:StandardPartsService,private _stadardPartTypeItemService:StandardPartTypeItemService,private _chRef: ChangeDetectorRef,private _standardPartCategoryService:StandardPartCategoryService,private _authService: AuthService,private router:Router,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    var auth_role = ["Admin","User"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }
    this.getAllSPCategory();
    this.getAllSPUOM();
    this.addForm =  this.formBuilder.group({
      sp_category: ['', Validators.required],
      type_item: ['', Validators.required],
      product_part_number: ['', [Validators.pattern('^[a-zA-Z0-9 \-\'Ø+_&/\\().,#-]+'),Validators.required]],
      greatech_drawing_naming: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', [Validators.pattern('^[a-zA-Z0-9 \-\'Ø+_&/\\().,#-]+'),Validators.required]],
      uom: ['', Validators.required],
      remark: [''],
      assign_material: ['', Validators.required],
      assign_weight: ['', Validators.required],
      folder_location: ['', Validators.required],
      vendor: ['LV', Validators.required]
    });
  }

  typeItemOnChange(val){
    this.category_id = val;
    if(val){
      this.getAllTypeItem(val);
    }
    else{

    }

  }
  
  vendorOnChange(){
    
  }

  get f() {
    return this.addForm.controls
  }

  productBrandHandling(values){
    if(values["product_part_number"] != "" && values["brand"] != ""){
      this._standardPartService.checkPPNBrand(values["product_part_number"],values["brand"]).subscribe((response) => {
        if(response.status){
          this.productHandle = true;
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">'+response.message+'</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
            "",
            {
              timeOut: 3000,
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
          '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to check!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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
    }else{
      console.log("Please complete both for checking!");
    }
  }

  add(values){
    this.isSubmitted = true;
    values["user_id"] = this._authService.getUserID();

    if(values["sp_category"] != 8){
      values["vendor"] = null;
    }
    if(this.addForm.invalid && this.productHandle == true){
      if(this.productHandle){
        this._toastrService.show(
          '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Please check your product part number and brand!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
          "",
          {
            timeOut: 3000,
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
      return;
    }
    else{
      // @ts-ignore
      Swal.fire({
        title: 'Do you sure want to continue to add this part?',
        html: `<div class="text-center">
        <div><b>Part No:</b> `+values["product_part_number"]+`</div>
        </div>`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
      }).then((result) => {
        console.log(result);
        if (result.value) {
          this._standardPartService.addSP(values).subscribe((response) => {
            console.log(response);
            if(response.status){

              // @ts-ignore
              Swal.fire({
                title: "Following Parts Added:",
                html: `<div class="text-center">
                <div><b>Part No:</b> </div><input style='border:none;text-align:center;' value="`+response.main.part_number+`" onclick="this.select();"  readonly="readonly"/>
                <div><b>ERP Code:</b> </div><input style='border:none;text-align:center;' value="`+response.main.erp_code+`" onclick="this.select();" readonly="readonly"/>
                </div>`,
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
              this.addForm.patchValue({
                sp_category: '',
                type_item: '',
                uom: '',
                assign_material: '',
                assign_weight: '',
                vendor: 'LV'
              })
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
        } else{
          Swal.fire('Action Canceled!', '', 'info')
        }
      })

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


  getAllTypeItem(sp_id){
    this._stadardPartTypeItemService.getAllSPByCategoryId(sp_id).subscribe((response) => {
      this.sp_typeitem = response.result;
      console.log(this.sp_typeitem);
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

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}

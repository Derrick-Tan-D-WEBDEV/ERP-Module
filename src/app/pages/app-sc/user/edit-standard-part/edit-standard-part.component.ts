import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StandardPartsService } from 'src/app/services/standard-parts.service';
import { StandardPartTypeItemService } from 'src/app/services/standard-part-type-item.service';
import { StandardPartCategoryService } from 'src/app/services/standard-part-category.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-standard-part',
  templateUrl: './edit-standard-part.component.html',
  styleUrls: ['./edit-standard-part.component.scss']
})
export class EditStandardPartComponent implements OnInit {
  id: any;
  is_sub:any;
  editForm: FormGroup;
  editForm_sub: FormGroup;
  isSubmitted:any;

  sp_category:any;
  sp_typeitem:any;
  sp_uom:any;
  category_id:any;
  constructor(private route: ActivatedRoute,private _authService: AuthService,private router:Router,private _standardPartCategoryService:StandardPartCategoryService,private _standardPartService:StandardPartsService,private _stadardPartTypeItemService:StandardPartTypeItemService,private formBuilder:FormBuilder,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllSPCategory();
    this.getAllSPUOM();

    this.id = this.route.snapshot.paramMap.get('id');
    this.is_sub = this.route.snapshot.paramMap.get('is_sub');
    this.getOneSP(this.id);

    var auth_role = ["Admin","User"];
    if(!auth_role.includes(this._authService.getActionRole())){
      this.router.navigate(['/user/dashboard']);
    }

    this.editForm =  this.formBuilder.group({
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
      vendor: ['', Validators.required]
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
    return this.editForm.controls
  }

  edit(values){
    this.isSubmitted = true;
    values["user_id"] = this._authService.getUserID();
    values["id"] = this.id;

    // if(values["sp_category"] != 8){
    //   values["vendor"] = null;
    // }
    if(this.editForm.invalid){
      return;
    }
    else{
      this._standardPartService.editSP(values).subscribe((response) => {
        console.log(response);
        if(response.status){
          this._toastrService.show(
            '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Successfully update standard parts!</span> <span data-notify="message">Nice!</span></div>',
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
          '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">Fail to update standard parts!</span> <span data-notify="message">Please contact the support team, if needed!</span></div>',
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

  getOneSP(id){
    this._standardPartService.getSPByID(id).subscribe((response) => {
      console.log(response.result);
      if(response.result.length == 0){
        alert("Can't Find Standard Part!");
        this.router.navigateByUrl('/user/dashbaord');
      }else{
        this.getAllTypeItem(response.result[0].category_id);
        this.category_id = response.result[0].category_id;
        this.editForm.patchValue({
          sp_category: response.result[0].category_id,
          type_item: response.result[0].type_item,
          product_part_number: response.result[0].product_part_number,
          greatech_drawing_naming: response.result[0].greatech_drawing_naming,
          description: response.result[0].description,
          brand: response.result[0].brand,
          uom: response.result[0].uom,
          remark: response.result[0].remark,
          assign_material: response.result[0].assign_material,
          assign_weight: response.result[0].assign_weight,
          folder_location: response.result[0].folder_location,
          vendor: response.result[0].vendor
        })
        if(response.result[0].vendor == ''){
          this.editForm.patchValue({
            vendor: 'LV'
          })
        }
      }

      
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

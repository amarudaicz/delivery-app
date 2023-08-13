import { Component, HostListener, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Category } from 'src/app/interfaces/category-interfaz';
import { AdminService } from 'src/app/services/admin/admin.service';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  animations: [fadeIn],
})
export class NewCategoryComponent {
  categoryForm: FormGroup;
  dataForm?: FormData;
  previewImageSrc?: any;
  image: string|File|null = null;
  loadForm: boolean = false;
  editing:boolean=false
  allCategories:Category[] = []

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private notificationsAdmin: NotificationsAdminService,
    private dinamicList: DinamicListService,
    public dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEditCategory:Category,
  ) {

    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      sort_order:''
    });
    
    this.adminService.categories$.subscribe(categories=>{
      console.log(categories);
      if (!categories) return 
      this.allCategories = categories
      this.categoryForm.get('sort_order')?.setValue(this.allCategories[this.allCategories.length - 1].sort_order + 1)
    })

    if (this.dataEditCategory) {
      this.editing = true
      this.patchForm()
      console.log(this.dataEditCategory);
    }

    
  }

  ngOnInit() {
    window.history.pushState({modal:true}, 'modal');
  }
  
  @HostListener('window:popstate')
  onPopState() {
    // Detectar el evento de retroceso del historial
    this.dialogRef.close();
  }

  submitForm() {
    if (this.categoryForm.valid) {

      this.loadForm = true;


      if (!this.dataEditCategory) {
        this.adminService.postCategory({ ...this.categoryForm.value, image: this.image })
          .pipe(
            catchError(() => {
              this.loadForm = false;
              return handleError(undefined, this.notificationsAdmin);
            })
          ).subscribe((res) => this.processForm('new'));

        return
      }


      this.adminService.editCategory({
        ...this.categoryForm.value, 
        image: this.image, 
        id:this.dataEditCategory.id}).subscribe((res) => this.processForm('edit'));



    } else {
      this.notificationsAdmin.new('Completar los campos requeridos');
    }
  }


  processForm(form:string){
    if (form === 'edit') {
      this.adminService.getCategories().subscribe()
      this.notificationsAdmin.new(
        `Categoria ${
          this.categoryForm.get('name')?.value
        } actualizada con exito`,
        'Ok',
        { push: true }
      );

    }else{
      
      this.adminService.getCategories().subscribe()
      this.notificationsAdmin.new(
        `Categoria ${
          this.categoryForm.get('name')?.value
        } creada con exito`,
        'Ok',
        { push: true }
      )
      

    }


    this.dialogRef.close();
  }

  patchForm(){
    this.categoryForm.patchValue({name:this.dataEditCategory.category_name, description:this.dataEditCategory.category_description || '' ,sort_order:this.dataEditCategory.sort_order})
    this.previewImageSrc = this.dataEditCategory.category_image
    this.image = this.dataEditCategory.category_image
  }

  uploadImage(event: any) {
    console.log(event);

    const image = (event.target as HTMLInputElement).files![0];
    console.log(image);

    if (image) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageSrc = e.target.result;
      };
      reader.readAsDataURL(image);
    }

    this.image = image;
  }

  removeImage(inputUploadImage: HTMLInputElement) {
    inputUploadImage.value = '';
    this.previewImageSrc = null
    this.image = null
  }
}

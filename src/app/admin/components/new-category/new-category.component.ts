import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {
  categoryForm: FormGroup;
  dataForm?: FormData
  previewImageCategory?: any
  image: any
  loadForm: boolean = false

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private alert: NotificationsAdminService, public dialogRef: MatDialogRef<NewCategoryComponent>, private dinamicList: DinamicListService) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
  }

  submitForm() {


    if (this.categoryForm.valid) {
      this.loadForm = true
      this.adminService.postCategory({ ...this.categoryForm.value, image: this.image }).subscribe(res => {
        this.adminService.categories = undefined
        this.dinamicList.updateDashboardList.next(true)
        this.alert.new(`Categoria ${this.categoryForm.get('name')?.value} creada con exito`, 'Ok', { push: true })
        this.dialogRef.close()
      })
    } else {
      this.alert.new('Completar los campos requeridos')
    }
  }


  uploadImage(fileInput: any) {
    console.log(fileInput.files[0].name);
    this.previewImageCategory = fileInput.files[0].name
    this.image = fileInput.files[0]
  }



}

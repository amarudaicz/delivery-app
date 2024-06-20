import { N } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { catchError, firstValueFrom } from 'rxjs';
import { Local } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';
@Component({
  selector: 'app-config-local',
  templateUrl: './config-local.component.html',
  styleUrls: ['./config-local.component.scss'],
  providers: [MessageService],
})
export class ConfigLocalComponent implements OnInit {
  form: FormGroup;
  imageLocal: any;
  previewImageLocal: any;
  editing: boolean = false;
  imageUpload: boolean = false;
  processForm: boolean = false;
  loadMap:boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private localData: LocalDataService,
    private toastr: MessageService,
    private adminService: AdminService,
    private cloudinary: CloudinaryService,
    private notificationsAdmin: NotificationsAdminService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.disable();
    this.setDataLocal();
  }

  async saveDataLocal() {
    const data = {
      ...this.form.value,
    };

    if (!this.form.dirty && !this.imageUpload) {
      this.editing = false;
      this.form.disable();
      return;
    }

    if (this.form.invalid) {
      this.notificationsAdmin.new('Completar los campos requeridos');
      return;
    }

    this.processForm = true;

    if (this.imageUpload) {
      const cloudinaryLocal = (await firstValueFrom(
        this.cloudinary.upload(this.imageLocal)
      )) as any;
      this.imageLocal = cloudinaryLocal.url;
      this.imageUpload = false;
    }

    this.adminService
      .updateLocal({ ...data, image: this.imageLocal }).pipe(
        catchError(({error})=>{
          this.editing = false;
          this.processForm = false;
          return handleError(error, this.notificationsAdmin)
        })
      )
      .subscribe((res) => {
        this.notificationsAdmin.new('Datos de la tienda guardados con exito');
        this.form.markAsPristine();
        this.form.disable();
        this.editing = false;
        this.processForm = false;
      });
  }

  editDataLocal() {
    this.form.enable();
    this.editing = true;
  }

  setDataLocal() {
    this.adminService.local$.subscribe((data) => {
      this.previewImageLocal = data?.image;
      this.imageLocal = data?.image;

      this.form.patchValue({
        name: data?.name,
        location: data?.location,
        phone: data?.phone,
      });
    });
  }

  uploadImage(event: any) {
    console.log(event);
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageLocal = file;
      this.imageUpload = true;
      this.form.get('image')?.setValue(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);
        this.previewImageLocal = e.target?.result;
        console.log(this.previewImageLocal);
      };
      reader.readAsDataURL(file);
    }
  }

  removePreviewImage() {
    this.previewImageLocal = undefined;
    this.imageLocal = null;
    this.imageUpload = false
    this.form.markAsDirty()
  }

}

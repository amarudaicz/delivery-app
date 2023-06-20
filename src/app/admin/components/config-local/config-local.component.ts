import { N } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';
import { Local } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
@Component({
  selector: 'app-config-local',
  templateUrl: './config-local.component.html',
  styleUrls: ['./config-local.component.scss'],
  providers: [MessageService]
})
export class ConfigLocalComponent implements OnInit {
  product:any
  form: FormGroup
  horariosForm:FormGroup
  imageLocal: any
  previewImageLocal: any
  editing: boolean = false
  imageUpload:boolean = false
  processForm:boolean=false


  constructor(
    private formBuilder: FormBuilder,
    private localData: LocalDataService,
    private toastr: MessageService,
    private adminService: AdminService,
    private cloudinary: CloudinaryService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      transfer: [false],
      delivery:[false],
      pickLocal:[false],
      delivery_cost: [null],
      delivery_time: [null , Validators.pattern(/^\d{1,2}\s-\s\d{1,2}$/)],
      instagram: [''],
      website: [''],
      maps: [''],
      aliascbu:['']
    })
    
    this.horariosForm = this.formBuilder.group({
      daysWeek:[[''],Validators.required],
      daysWeekend:[['']],
      semanaMañanaInicio: [''], 
      semanaMañanaFin: ['' ],
      semanaTardeInicio: [''], 
      semanaTardeFin: [''], 
      finDeSemanaMañanaInicio: [''], 
      finDeSemanaMañanaFin: [''], 
      finDeSemanaTardeInicio: [''], 
      finDeSemanaTardeFin: [''], 
    })

    Object.keys(this.horariosForm.controls).forEach(c=>{
      if (c.charAt(0) === 's' || c.charAt(0) === 'f' ) {
        this.horariosForm.controls[c].addValidators(Validators.pattern(/^\d{1,2}(?::\d{2})?(?:am|pm)$/))
      }
    })
    
  }

  ngOnInit(): void {
    this.form.disable()
    this.horariosForm.disable()
    this.setDataLocal()


  }


  async saveDataLocal() {
    if (!this.form.get('delivery')?.value) {
      this.form.get('delivery_time')?.setValue(null)
      this.form.get('delivery_cost')?.setValue(null)
    }
  

    const data = {
      ...this.form.value,
      horarios: this.createObjecthorarios(),
    }
    
    if (!this.form.dirty && !this.horariosForm.dirty && !this.imageUpload  ){
      this.editing = false
      
      this.form.disable()
      this.horariosForm.disable()
      return
    } 
    
    if (this.form.invalid || this.horariosForm.invalid ) {
      this.toastr.add({ severity: 'error', detail: 'Completar todos los campos' })
      return
    }
    
    this.processForm = true
    
    if (this.imageUpload){
      const cloudinaryLocal = await firstValueFrom(this.cloudinary.upload(this.imageLocal)) as any
      this.imageLocal = cloudinaryLocal.url
      this.imageUpload = false
    }

    this.adminService.updateLocal({ ...data, image: this.imageLocal }).subscribe(res => {
      this.toastr.add({ severity: 'success', detail: 'Los datos han sido guardados' })
      this.horariosForm.markAsPristine()
      this.form.markAsPristine()
      this.form.disable()
      this.horariosForm.disable()
      this.editing = false
      this.processForm = false
    })



  }

  editDataLocal() {
    this.form.enable()
    this.horariosForm.enable()

    this.editing = true
  }


  setDataLocal() {

    this.adminService.getLocal().subscribe((data) => {

      console.log(data);
      this.product = data
      this.previewImageLocal = data.image
      this.imageLocal = data.image

      this.form.patchValue({
        name: data?.name,
        location: data?.location,
        phone: data.phone,
        instagram: data.instagram,
        website: data.website,
        maps: data.maps,
        transfer: data.aliascbu ? true : false,
        aliascbu:data.aliascbu,
        delivery:data.delivery_time ? true : false,
        pickLocal:data.pick_in_local ? true : false,
        delivery_time: data.delivery_time,
        delivery_cost: data.delivery_cost
      })


      this.horariosForm.patchValue({
        daysWeek:data.horarios.semana.dias,
        daysWeekend:data.horarios.finDeSemana.dias,
        finDeSemanaMañanaInicio: data.horarios.finDeSemana.maIn,
        finDeSemanaMañanaFin: data.horarios.finDeSemana.maFn,
        finDeSemanaTardeInicio: data.horarios.finDeSemana.taIn,
        finDeSemanaTardeFin: data.horarios.finDeSemana.taFn,
        semanaMañanaInicio: data.horarios.semana.maIn,
        semanaMañanaFin: data.horarios.semana.maFn,
        semanaTardeInicio: data.horarios.semana.taIn,
        semanaTardeFin: data.horarios.semana.taFn,
  
      })
    })


  }

  createObjecthorarios() {
    const formData = this.horariosForm.controls
    console.log(this.horariosForm);

    const horarios = {
      semana: {
        dias: formData['daysWeek'].value,
        maIn: formData['semanaMañanaInicio'].value ? formData['semanaMañanaInicio'].value : null,
        maFn: formData['semanaMañanaFin'].value ? formData['semanaMañanaFin'].value : null,
        taIn: formData['semanaTardeInicio'].value ? formData['semanaTardeInicio'].value : null,
        taFn: formData['semanaTardeFin'].value ? formData['semanaTardeFin'].value : null
      },

      finDeSemana: {
        dias: formData['daysWeekend'].value,
        maIn: formData['finDeSemanaMañanaInicio'].value ? formData['finDeSemanaMañanaInicio'].value : null,
        maFn: formData['finDeSemanaMañanaFin'].value ? formData['finDeSemanaMañanaFin'].value : null,
        taIn: formData['finDeSemanaTardeInicio'].value ? formData['finDeSemanaTardeInicio'].value : null,
        taFn: formData['finDeSemanaTardeFin'].value ? formData['finDeSemanaTardeFin'].value : null
      }

    }

    return horarios
  }


  uploadImage(event: any) {

    if (event.files.length > 0) {
      const file = event.files[0];
      this.imageLocal = file
      this.imageUpload = true 
      this.form.get('image')?.setValue(file)
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
    this.previewImageLocal = undefined
    this.imageLocal = null
  }



}

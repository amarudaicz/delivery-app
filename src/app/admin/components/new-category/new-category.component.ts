import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {
  categoryForm: FormGroup;
  dataForm?:FormData
  previewImageCategory?:any

  constructor(private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm() {
    if (this.categoryForm.valid) {
      // Aquí puedes enviar los datos del formulario al servidor
      console.log(this.categoryForm.value);
    } else {
      // El formulario no es válido, muestra un mensaje de error o realiza alguna otra acción
    }
  }


  uploadImage(fileInput:any){
    console.log(fileInput.files[0].name);
    this.previewImageCategory = fileInput.files[0].name 

    this.dataForm?.append('image', fileInput.files[0])
    // this.previewImageCategory = true

  }



}

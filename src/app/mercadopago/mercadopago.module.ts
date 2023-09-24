import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFormComponent } from './components/card-form/card-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CardFormComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    SharedModule
  ],
  exports:[
    CardFormComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {horizontalPosition:'center', verticalPosition:'bottom'}}
  ]
  
})
export class MercadopagoModule { }

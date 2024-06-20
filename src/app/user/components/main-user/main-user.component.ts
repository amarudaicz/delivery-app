import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { UserService } from 'src/app/services/userData/user.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss'],
  animations:[
    fadeIn
  ]
})
export class MainUserComponent implements OnInit {

  form:FormGroup
  userData:any = this.userService.getUserData()//INTERFACE USER

  constructor(
    public theme:ThemesService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private routeService:RouteDataService,
    private snackBar:MatSnackBar

  ){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      direction: ['', Validators.required ],
      reference: ['', Validators.required],
    });
  }
  
  
  ngOnInit(): void {
    if (this.userData){
    
      this.form.patchValue({
        name: this.userData.name,
        phone: this.userData.phone,
        direction: this.userData.direction,
        reference: this.userData.reference,
      });
    }


    this.routeService.setCurrent('user')
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  
  
  saveData(){
    const data = this.form

    if (data.valid) {
      this.userService.saveUserShipping(data.value);
      this.openSnackBar('Datos actualizados', 'Ok')
      
    }
    
  }



}

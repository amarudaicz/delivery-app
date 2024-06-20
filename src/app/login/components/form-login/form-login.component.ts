import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { noScriptValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  animations:[fadeIn]
})
export class FormLoginComponent implements OnInit {
  
  loginForm:FormGroup 
  formSubmitted:boolean = false
  formTrySubmit:boolean = false
  showPassword:boolean = false 
  errorResponse?:string
  
  constructor(
    private formBuilder: FormBuilder, 
    private authService:AuthService, 
    private layoutState:LayoutStateService,
    private router:Router,
    private toast:MatSnackBar
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required, noScriptValidator()],
      password: ['', Validators.required, noScriptValidator()]
    });

  }


  ngOnInit(): void {

  }
  
  onSubmit() {
    this.formTrySubmit = true
    if (this.loginForm.invalid) return 

    this.errorResponse = undefined
    this.formSubmitted = true
    
    this.authService.logIn(this.loginForm.value).pipe(
      catchError(err=>{
        if (!err.status) this.errorResponse = 'Porfavor intente nuevamente en unas horas'
        else this.errorResponse = err.error       
        this.formSubmitted = false
        return throwError(() => new Error(err));
      })).subscribe((res:any) => {
        this.authService.setToken(res.token, res.exp)
        this.formSubmitted = false
        
        console.log('NAVIGATING');
        this.router.navigate(['admin'])    
      });
  }

  getError(control:string, error?:string){

    if (error){
      if (this.loginForm.get(control)?.errors) {
        console.log(this.loginForm.get(control)?.errors![error] && this.formTrySubmit);
        return this.loginForm.get(control)?.errors![error] && this.formTrySubmit
      }
    }
    
    return this.loginForm.get(control)?.invalid && this.formTrySubmit
  }

  comparePassword(){

    return this.loginForm.get('password')?.value !== this.loginForm.get('repeatPassword')?.value && this.formTrySubmit && this.loginForm.get('repeatPassword')?.valid

  }

  ngOnDestroy(){


  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
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
  @Input() register:boolean = false
  

  constructor(
    private formBuilder: FormBuilder, 
    private authService:AuthService, 
    private cookies:CookieService,
    private layoutState:LayoutStateService,
    private router:Router
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required, noScriptValidator()],
      password: ['', Validators.required, noScriptValidator()]
    });

    this.layoutState.state.header = false
    this.layoutState.state.navigation=false;
    this.layoutState.updateState()
  }


  ngOnInit(): void {
    if (this.register){
      this.loginForm.addControl('email', this.formBuilder.control(null, [Validators.required,Validators.email, noScriptValidator()]))
      this.loginForm.addControl('repeatPassword', this.formBuilder.control(null, [Validators.required, noScriptValidator()]))
      this.loginForm.get('password')?.addValidators(Validators.minLength(8))
      this.loginForm.updateValueAndValidity()
    }
  }
  
  onSubmit() {
    this.formTrySubmit = true
    console.log(this.loginForm);
    
    
    if (this.loginForm.valid) {
      this.errorResponse = undefined
      this.formSubmitted = true

      this.processForm(this.loginForm.value).subscribe((res:any) => {
        this.processResponse(res)
        // Hacer algo con los items recibidos
      });
    }

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


  processResponse(res:any){
    this.authService.setToken(res.token, res.exp)
    this.formSubmitted = false

    if (this.register){
      this.router.navigate([''])
      return
    }

    this.router.navigate(['/admin'])
  }

  processForm(form:any){
    console.log(form);
    

    if (this.register){
      return this.authService.signIn(form).pipe(
        catchError(err => {
          if (err.loaded === 0) this.errorResponse = 'Intente nuevamente en unas horas estamos solucionando un problema'
          else this.errorResponse = err

          this.formSubmitted = false
          return ''
        })
      )
    }else{
      return this.authService.logIn(form).pipe(
        catchError(err => {
          if (err.loaded === 0) this.errorResponse = 'Intente nuevamente en unas horas estamos solucionando un problema'
          else this.errorResponse = err

          this.formSubmitted = false
          return ''
        })
      )
    }

  }


  comparePassword(){

    return this.loginForm.get('password')?.value !== this.loginForm.get('repeatPassword')?.value && this.formTrySubmit && this.loginForm.get('repeatPassword')?.valid

  }

  ngOnDestroy(){


  }

}

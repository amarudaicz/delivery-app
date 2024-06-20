import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, catchError, interval, of, throwError } from 'rxjs';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { handleError } from 'src/app/utils/handle-error-http';
import { passwordMatchValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations:[fadeIn]
})
export class ResetPasswordComponent implements OnInit {
  
  token?:string
  isTokenValid?:boolean
  newPassword?:string
  errorEmail?:string
  formEmail:FormGroup
  formReset:FormGroup
  emailSended:boolean = false
  countdown:number = 0
  countdownFormatted?:string
  attempsSendEmail:number = 0
  countdownSuscription?:Subscription
  errorToken?:string
  finishProcess?:boolean
  formSubmitted?:boolean
  errorReset?:string  

  constructor(private route:ActivatedRoute, private authService:AuthService, private formBuilder:FormBuilder) {

    this.route.queryParams.subscribe(params=>{
      this.token = params['token']
      console.log(this.token);
    })

    this.formEmail = this.formBuilder.group({
      email:[null, [Validators.required, Validators.email]]
    })

    this.formReset = this.formBuilder.group({
      password:['', [Validators.required, Validators.minLength(8) ]],
      confirmPassword:[null, [Validators.required]]
    }, {validators:passwordMatchValidator})

    this.newPassword = this.formReset.get('password')?.value

    this.sendToken(this.token!)
  }

  ngOnInit(): void {




  }

  sendEmail(){
    console.log('asdsad');
    
    if (this.formEmail.invalid) {
      this.formEmail.markAllAsTouched()
      return
    }
    this.formSubmitted = true

    this.authService.sendEmailToResetPassword(this.formEmail.value).pipe(
      catchError(err=>{
        this.errorEmail = err.error
        this.formSubmitted = false
        return throwError(() => new Error('Email not found')); // Usar una función de fábrica para crear el error
      })
    ).subscribe(res=>{
      this.emailSended = true
      this.attempsSendEmail++
      this.formSubmitted = false
    })

  }

  saveNewPassword(){
    
    if (this.formReset.invalid){
      this.formReset.markAllAsTouched()
      return
    }

    this.formSubmitted = true
    
    this.authService.resetPassword({password:this.formReset.get('password')?.value, token:this.token!}).pipe(
      catchError(err=>{
        console.log(err);
        this.formSubmitted = false
        this.errorReset = err.error
        return throwError(()=> new Error('error'))
      })
    ).subscribe(res=>{
      this.finishProcess = true
      this.formSubmitted = false
    })
  }


  resendEmail(){
    if (this.countdown) {
      return
    }
    this.startCountdownResend(this.timeToResendEmail(this.attempsSendEmail))
    this.sendEmail()
  }


  async sendToken(token:string){
    console.log(token);
    
    if (!token) {
      return
    }
    const isTokenValid = await this.authService.verifyToken(token)
    if (!isTokenValid) {
      this.errorToken = 'El link que uso expiró o no es correcto '
      this.isTokenValid =  false
    }
   
  }

  


  getError(control:string, error?:string){

    if (error){
      if (this.formEmail.get(control)?.errors) {
        console.log(this.formEmail.get(control)?.errors![error])
        return this.formEmail.get(control)?.errors![error] && this.attempsSendEmail
      }
      
    }
    
    return this.formEmail.get(control)?.invalid  && this.attempsSendEmail
  }

  
  startCountdownResend(seconds:number){
    this.countdownSuscription?.unsubscribe()
    this.countdown = seconds
    console.log(this.countdownSuscription);
    
    this.countdownSuscription = interval(500).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--; // Decrementa el contador en 1
        const minutes = Math.floor(this.countdown / 60);
        const seconds = this.countdown % 60;
  
        // Formatea la salida como "minutos:segundos"
        this.countdownFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      } else {
        this.countdownSuscription?.unsubscribe()
      }
    });

  }

  timeToResendEmail(attemps:number){
    console.log(attemps);
    
    return attemps * 60
  }

}

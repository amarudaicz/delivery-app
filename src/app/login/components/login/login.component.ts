import { Component, Input, OnDestroy,OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, of, tap, throwError } from 'rxjs';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[fadeIn]
})
export class LoginComponent implements OnDestroy, OnInit {

  register:boolean = false



  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private cookies:CookieService,
    private layoutState:LayoutStateService,
    private router:Router
  ) {
  }


  ngOnInit(): void {


  }





  ngOnDestroy(){
    this.layoutState.state.navigation = true
    this.layoutState.updateState()

  }
}

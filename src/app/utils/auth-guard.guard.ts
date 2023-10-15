import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { inject } from "@angular/core";



export const AuthGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const auth = authService.isLogged()
  console.log(auth)
  if (auth) return true
  else return router.navigate(['/login'])
}
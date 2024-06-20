import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { inject } from "@angular/core";



export const adminGuard = async () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const auth = await authService.isLogged()
  if (auth) return true
  else return router.navigate(['/login'])
}

export const loginGuard = async () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const auth = await authService.isLogged()
  if (!auth) return true 
  else return router.navigate(['/admin'])
}
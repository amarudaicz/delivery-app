import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { finalize } from 'rxjs/operators';
import { LoaderHttpService } from '../loader-http/loader-http.service';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request);
    if (request.url.includes('https://api.cloudinary.com')) {
      return next.handle(request);
    }

    const token = this.authService.getToken();
    console.log(token);

    if (!token) {
      return next.handle(request);
    }

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(authRequest);
  }
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderHttpService) {}

  private countRequest = 0;
  private idMessage?: string;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if (!this.countRequest) {
      this.loaderService.show();
    }

    this.countRequest++;
    return next.handle(request).pipe(
      finalize(() => {
        this.countRequest--;
        if (!this.countRequest) {
          this.loaderService.hide();
        }
      })
    );
  }
}

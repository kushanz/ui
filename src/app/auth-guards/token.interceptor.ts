import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token = AuthGuardService.token;//localStorage.getItem('token');
    
    request = request.clone({
      setHeaders: {
        Authorization: `bearer ${token}`
      }
    });
    return next.handle(request);
  }
}
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
 } from '@angular/common/http';
import { Observable } from 'rxjs';
//gloval
declare let Alertify:any;

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private authServices:AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).do(next=>{
      if(next instanceof HttpResponse){
        if(next.status === 201 ){//CORRETO
          Alertify.set('notifier','position', 'top-right');//posiscion
          Alertify.success('Correcto');
        }

      }},
      error =>{
        if (error.status === 400) {
          Alertify.set('notifier','position', 'top-right');//posiscion
          Alertify.warning('Incorrecto : 400 '+ error);
        }
        if (error.status === 0 ){
          Alertify.set('notifier','position', 'top-right');//posiscion
          Alertify.warning('Incorrecto TOKEN: 0 ' + error);
        }
      }
      );

  }//end interceptor
}

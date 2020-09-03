import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do'//nesesario para el do
//gloval
declare let alertify:any;

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).do(next=>{
      if(next instanceof HttpResponse){
        if(next.status === 200 ){//CORRETO
          alertify.set('notifier','position', 'top-right');//posiscion
          alertify.success('Correcto 200');
        }
        if(next.status === 201 ){//CORRETO
          alertify.set('notifier','position', 'top-right');//posiscion
          alertify.success('Correcto 201');
        }

      }},
      error =>{
        if (error.status === 400) {
          alertify.set('notifier','position', 'top-right');//posiscion
          alertify.warning('Incorrecto : 400');
        }
        if (error.status === 409 ){
          alertify.set('notifier','position', 'top-right');//posiscion
          alertify.warning('Incorrecto : 409');
        }
        if (error.status === 0 ){
          alertify.set('notifier','position', 'top-right');//posiscion
          alertify.warning('Incorrecto INTERCEPTOR: 0');
        }
      }
      );

  }
}

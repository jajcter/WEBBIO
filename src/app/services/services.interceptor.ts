import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
declare let alertify:any;

@Injectable()
export class ServicesInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, response: HttpHandler): Observable<HttpEvent<unknown>> {
    return response.handle(request).do(next => {
      if(next instanceof HttpResponse){
        if(next.status === 200)
        {
          alertify.success('Correcto');
        }

      }
    }, error => {
      console.error(error);
      if(error.status === 400)
        {
          alertify.error('Error: 400 '+error);
        }
        if(error.status === 0)
        {
          alertify.error('Error SERVICES: 0 '+error.message);
        }
    });
  }
}

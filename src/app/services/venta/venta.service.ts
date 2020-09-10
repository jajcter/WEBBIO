//todo el componente echo por Alan
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Venta } from '../../models/venta/venta';
import {Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  //todo el componente echo por Alan
  url: string = "https://localhost:44380/api/Venta";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  save(venta: Venta): Observable<any> {
    venta.idUsuario= JSON.parse(localStorage.getItem('id'));
    let ventaBody = JSON.stringify(venta);
    if (venta.idVenta === undefined) {
      return this.http.post<any>(this.url, ventaBody, this.httpOptions);
    }
    return this.http.put<any>(this.url, ventaBody, this.httpOptions);

  }

  idVenta() : Observable<any> {
    return this.http.get<Venta>(this.url + "?dato=1&edato=2", this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}

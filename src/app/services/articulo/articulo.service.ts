import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Articulo } from "../../models/articulo/articulo";
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {


  url : string = "https://localhost:44380/api/Articulos";
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  save(a:Articulo,idUsuario:number) : Observable<any> {
    a.idUsuario=idUsuario;
    let alumnoBody = JSON.stringify(a);
    if(a.idArticulo === undefined){
      return this.http.post<any>(this.url+'/Add', alumnoBody, this.httpOptions);
    }
    return this.http.post<any>(this.url+'/UpDate', alumnoBody, this.httpOptions);
  }

  listArticulo(criterio:string): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.url + "/Get?criterio=" + criterio, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  delete(a: Articulo) : Observable<any> {

    const option={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body:{
        token: localStorage.getItem('token')
      }
    }
    return this.http.delete<any>(this.url + '/Delete/' + a.idArticulo,option);
  }

  retrieve(id:number): Observable<Articulo> {
    return this.http.get<Articulo>(this.url + "/Get/" + id, this.httpOptions)
      .pipe(
        retry(1)
      );
  }
  // manotoa
  getArticulos(): Observable<Articulo[]>  {
    //Todo: Poblar Articulos desde una API y retornar una lista
      return this.http.get<Articulo[]>(this.url+'/Get');
  }
  // Parte de Articulos del usuario
  list(id:number): Observable<Articulo[]> {//este metodo nos falta---------------------------------

    return this.http.get<Articulo[]>(this.url + "/ListId/" + id , this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}

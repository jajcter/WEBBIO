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
//se necesita el id para validar el toquen
  save(a,idUsuario) : Observable<any> {
    a.idUsuario=localStorage.getItem('id');
    console.log(a)
    let alumnoBody = JSON.stringify(a);
    if(a.idArticulo === undefined){
      return this.http.post<any>(this.url+'/Post', alumnoBody, this.httpOptions);
    }
    return this.http.post<any>(this.url+'/UpDate', alumnoBody, this.httpOptions);
  }

  listArticulos(criterio:string): Observable<Articulo[]> {
    if(localStorage.getItem('token')){
      return this.http.get<Articulo[]>(this.url + "/GetL/"+localStorage.getItem('id')+"?criterio=" + criterio, this.httpOptions)
      .pipe(
        retry(1)
      );
    }else{//si no existe token llamamos a todos
      return this.http.get<Articulo[]>(this.url + "/Get?criterio=" + criterio, this.httpOptions)
      .pipe(
        retry(1)
      );
    }
  }
  listArticulosUser(criterio): Observable<Articulo[]>{
    return this.http.post<Articulo[]>(this.url + "/ListId/"+localStorage.getItem('id')+"?criterio=" + criterio, this.httpOptions)
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
  // esta funcion esta mal
  getArticulos(): Observable<Articulo[]>  {
    //Todo: Poblar Articulos desde una API y retornar una lista
      return this.http.get<Articulo[]>(this.url+'/Get');
  }
  // Parte de Articulos del usuario
  list(id:number): Observable<Articulo[]> {//este metodo nos falta---------------------------------

    return this.http.post<Articulo[]>(this.url + "/ListId/" + id , this.httpOptions)
      .pipe(
        retry(1)
      );
  }

}

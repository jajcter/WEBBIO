import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //atributos
  //private url="https://localhost:44380/api/Usuarios?e=dmmanotoa@espe.edu.ec&p=123456";
  private url="https://localhost:44380/api";
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }


  singIn(user){//iniciar sesion
    //retorna el token en estring
    return this.http.post<any>(this.url+'/Usuarios/Login',user)
  }
  //fincion
  logIn(){//conectado
    if(localStorage.getItem('token')){
      return true;
    }
    return  false;
  }

  getToken(){
    return localStorage.getItem('token');
  }
  logOut(){//cerrar sesión
    localStorage.removeItem('token');
    return this.http.post<any>(this.url+'/Usuarios/LogOut/'+localStorage.getItem('id'),localStorage.getItem('id'));
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  mainUsuario : User; //Un atributo del componente AlumnoMain que se va a inyectar en
                       //el componente AlumnoForm
  mainTitle : string;
  mainReload : boolean;

  constructor() { }

  ngOnInit(): void {
    this.onInit();
    this.grabar_localstorage();
    this.obtener_localstorage();
    //Eliminar de local storage
    localStorage.removeItem("usuario");
  }

  onInit() : void {
    this.mainUsuario = new User();
    this.mainTitle = "Registro de nuev@ alumno";
    this.mainReload = false;
  }

  toReload($event) : void {
    this.onInit();
    this.mainReload = $event;
  }

  // local storage
  obtener_localstorage(){
    let nombre = localStorage.getItem("nombre");
    let persona = JSON.parse( localStorage.getItem("persona") );

    alert('home-main: '+nombre);
  }

  grabar_localstorage() {
    let nombre: string = "Alan";

    let persona = {
      nombre: "Juan",
      edad: 18,
      coords: {
        lat: 10,
        lng: -10
      }
    }
    localStorage.setItem('nombre', nombre);
    localStorage.setItem("persona", JSON.stringify(persona));
    //localStorage.setItem("persona", persona);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPencilAlt, faTrash, faUser, faIdCard, faCalendar, faMapMarked, faGenderless, faUserAlt, faMapMarkedAlt, faPhone, faAt } from '@fortawesome/free-solid-svg-icons';
import { Articulo } from 'src/app/models/articulo/articulo';
declare let alertify:any;

@Component({
  selector: 'app-usuario-card',
  templateUrl: './usuario-card.component.html',
  styleUrls: ['./usuario-card.component.css']
})
export class UsuarioCardComponent implements OnInit {

  faUser = faUser;
  faTrash = faTrash;
  faPencilAlt=faPencilAlt;
  faEye=faEye;
  faIdCard = faIdCard;
  faCalendar = faCalendar;
  faMapMarked = faMapMarked;
  faGenderless = faGenderless;
  faUserAlt = faUserAlt;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faAt = faAt;

  mainArticulo : Articulo;
  mainReload : boolean;
  mainTitle : string;

  @Input() usuario : User=new User();

  constructor(private usuarioService: UserService, private activatedRoute : ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.usuarioService.retrieve(params['id']).subscribe(
            result => this.usuario = result
          )
        }
      }
    );
    this.onInit();
  }

  onInit() : void {
    this.mainArticulo = new Articulo();
    this.mainReload = false;
  }

  toUpdate($event) : void{
    this.mainArticulo = $event;
    //this.mainUsuario.fecha_nacimiento = this.mainUsuario.fecha_nacimiento.replace("T00:00:00","");
    console.log(this.mainArticulo);
  }

  toReload($event) : void {
    this.onInit();
    //alert('Mira como esta este objeto: ' + $event)
    //console.log("Mira este evento = " + $event);
    this.mainReload = $event;
  }

  reloadDone($event){
    this.mainReload = !$event;
  }

}

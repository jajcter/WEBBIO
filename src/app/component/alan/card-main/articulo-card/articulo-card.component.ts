import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo/articulo';
import { ArticuloService } from 'src/app/services/articulo/articulo.service';
import { ActivatedRoute } from '@angular/router';
import { faBiohazard, faMoneyBill, faInfo, faSave, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-articulo-card',
  templateUrl: './articulo-card.component.html',
  styleUrls: ['./articulo-card.component.css']
})
export class ArticuloCardComponent implements OnInit {

  faBiohazard =faBiohazard;
  faMoneyBill = faMoneyBill;
  faInfo = faInfo;
  faSave = faSave;
  faUserPlus = faUserPlus;
  faTimes = faTimes;

  usuario : User;
  articulo : Articulo;

  constructor(private articuloService: ArticuloService,
              private activatedRoute : ActivatedRoute,
              private usuarioService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.articuloService.retrieve(params['id']).subscribe(
            result => {
              this.articulo = result;
              this.infoUsuario(this.articulo.idUsuario);
            }
          )
        }
      }
    );
  }

  infoUsuario(id : number): void{
    //alert("mmmmm Id " + this.id_nuevo)
    this.usuarioService.retrieve(id).subscribe(
      result => this.usuario = result
    )
  }

}

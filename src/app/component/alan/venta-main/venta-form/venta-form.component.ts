import { Component, OnInit } from '@angular/core';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Articulo } from 'src/app/models/articulo/articulo';
import { ArticuloService } from 'src/app/services/articulo/articulo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venta-form',
  templateUrl: './venta-form.component.html',
  styleUrls: ['./venta-form.component.css']
})
export class VentaFormComponent implements OnInit {

  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  listArticulo : Articulo[];

  constructor(private articuloService: ArticuloService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.listArticulos('Mascarillas');
  }

  listArticulos(criterio) : void {
    this.articuloService.listArticulosUser(criterio).subscribe(
      result => {
        this.listArticulo = result
      }
    );
  }
  update(item){

  }
  delete(item){

  }

}

import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo/articulo.service';
import { Articulo } from 'src/app/models/articulo/articulo';
import { ActivatedRoute } from '@angular/router';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
declare let alertify:any;

@Component({
  selector: 'app-articulo-tabla',
  templateUrl: './articulo-tabla.component.html',
  styleUrls: ['./articulo-tabla.component.css']
})
export class ArticuloTablaComponent implements OnInit {

  constructor(
    private articuloService: ArticuloService,
    private activatedRoute : ActivatedRoute ) { }

  id_nuevo : number;
  articulos : Articulo[];
  //articulo : Articulo;

  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  @Output() ArticuloToEdit = new EventEmitter<Articulo>();
  @Input() flagToReload;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  //@Input() articulos : Articulo[]=[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          //alert('entra listas')
          this.id_nuevo=params['id'];
          this.listArticulos();
        }
      }
    );

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.flagToReload.currentValue){
      if(this.flagToReload){
        this.listArticulos();
      }
    }
  }

  listArticulos() : void {
    this.articuloService.list(this.id_nuevo).subscribe(
      result => {
        this.articulos = result
        this.reloadComplete.emit(true);
      }
    );
  }

  update(a:Articulo) :void {
    //console.log("Mira este objeto: " + a.nombre);

    this.ArticuloToEdit.emit(a);
  }

  delete(a:Articulo) :void {
    alertify.confirm('Eliminar artículo','¿Está seguro de eliminar el artículo: '+a.nombre+'. Precio: $'+a.precio,
      function(){
        alertify.set('notifier','positio','top-right')
        this.articuloService.delete(a).subscribe(result => {
          alertify.success('Eliminar - '+result);
          this.listArticulos();
          }
        );

      },
      function(){
        alertify.set('notifier','positio','bottom-right')
        alertify.error('Declinar')
      }
    );



  }
}

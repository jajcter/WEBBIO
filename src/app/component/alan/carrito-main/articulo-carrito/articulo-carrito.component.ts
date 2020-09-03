import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from 'src/app/models/articulo/articulo';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessengerService } from 'src/app/services/message/messenger.service';

@Component({
  selector: 'app-articulo-carrito',
  templateUrl: './articulo-carrito.component.html',
  styleUrls: ['./articulo-carrito.component.css']
})
export class ArticuloCarritoComponent implements OnInit {

  faTrash = faTrash;

  @Input() cartItem : Articulo
  
  subTotal:number=0;
  constructor( private msg: MessengerService ) { }

  ngOnInit(): void {
    //alert("mostrando dato: " + this.cartItem.nombre);
  }

  deleteTask(task: Articulo) {
    if(confirm('Seguro quieres borrarlo?')) {
      this.msg.deleteTask(task);
    }
  }
}

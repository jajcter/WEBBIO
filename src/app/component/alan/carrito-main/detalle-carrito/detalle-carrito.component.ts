import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/message/messenger.service';
import { Articulo } from 'src/app/models/articulo/articulo';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import {
  faEye,
  faDollarSign,
  faTrash } from '@fortawesome/free-solid-svg-icons';


declare let alertify:any;
@Component({
  selector: 'app-detalle-carrito',
  templateUrl: './detalle-carrito.component.html',
  styleUrls: ['./detalle-carrito.component.css']
})
export class DetalleCarritoComponent implements OnInit {

  faEye = faEye;
  faTrash = faTrash;
  faDollarSign=faDollarSign;

  //@Input() usuario : Usuario=new Usuario();
  usuario : User[];
  carrito : Articulo[];
  cont=-1;
  usuarioCarrito : User;
  tamano=0;
  array = [];

  constructor(
    private msg: MessengerService,
    public usuarioService : UserService) {}

  ngOnInit(): void {
    //this.carrito= this.msg.getarticulos();
    this.listarItems();
    this.tamano=this.carrito.length;
    for (let i = 0; i < 3; i++){
      alert("chupalo");
    }
    //localStorage.setItem('usuario', JSON.stringify(this.articulos));
    //alert("tamano " + this.tamano);
  }

  listarItems():void{
    this.carrito=this.msg.agruparArticuloUsuario();
  }
  deleteTask(task: Articulo) {
    if(confirm('Seguro quieres borrarlo?')) {
      this.msg.deleteArticulo(task);
      this.listarItems();
      //this.router.navigate(['detalle_carrito/']);
      //this.router.navigate(['usuarios']);
    }
  }
  comprar(a : Articulo){
    alertify.prompt( 'Compra', 'Desea comprar el articulo: '+a.nombre+ ', en: $'+a.precio
               , function() {

                 alertify.success('Compra exitosa'); }
               , function() { alertify.error('Cancel') });
     /*swal.fire({
      title: '¿Deseas hacer la compra?',
      text: "El articulo " + a.nombre + " precio" + a.precio,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        alert("lo as comprado")

        this.usuarioService.delete(a).subscribe(
          result => {
            console.log(result);
            this.list();
          }
        )

      }
    })*/
  }

/*
  nombreUsuario(id : number) : void{
    this.cont++;
    let n;
    //alert("contador " + this.cont++);
    //alert("tamano " + this.tamano);
    if( this.cont < (this.tamano)){
      //this.cont--;
      //alert("el id " + id + " contador " + this.cont);
      this.usuarioService.retrieve(id).subscribe(result => {
        this.usuario = result;

      }
        //alert(this.usuarioCarrito.nombres);
      );
      alert(this.usuario.nombres);
    }
  }
*/
}

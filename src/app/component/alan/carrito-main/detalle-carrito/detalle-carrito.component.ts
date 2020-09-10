//Este esta bien
import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from 'src/app/services/message/messenger.service';
import { Articulo } from 'src/app/models/articulo/articulo';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import { ActivatedRoute, Router } from '@angular/router';
//import swal from 'sweetalert2';
import { faDollarSign, faEnvelope, faTrash, faUser, faIdCard, faCalendar, faMapMarked, faGenderless, faUserAlt, faMapMarkedAlt, faPhone, faAt } from '@fortawesome/free-solid-svg-icons';
import { ArticuloService } from 'src/app/services/articulo/articulo.service';
import { NegocioService } from 'src/app/services/negocio/negocio.service';
import { VentaService } from 'src/app/services/venta/venta.service';
import { Negocio } from 'src/app/models/negocio/negocio';
import { Venta } from 'src/app/models/venta/venta';
//faenvelope icon de mensaje

declare let alertify:any;


@Component({
  selector: 'app-detalle-carrito',
  templateUrl: './detalle-carrito.component.html',
  styleUrls: ['./detalle-carrito.component.css']
})
export class DetalleCarritoComponent implements OnInit {

  faTrash = faTrash;
  faDollarSign=faDollarSign;
  faEnvelope=faEnvelope;

  arrayTotal = [];
  arrayCantidad = [];
  usuario : User[];
  carrito : Articulo[];

  texto = "";
  cont=false;
  total=0;
  usuarioCarrito : User;

  constructor(
    private msg: MessengerService,
    private router:Router,
    public usuarioService : UserService,
    private activatedRoute: ActivatedRoute,
    private articuloService : ArticuloService,
    private negocioService : NegocioService, private ventaService : VentaService
    ) {}

  ngOnInit(): void {
    this.listarItems();
    this.carrito.forEach((x,i) => {
      this.total=this.total + this.totalVenta(x.precio,1);
      this.arrayTotal[i] = x.precio;
      this.arrayCantidad[i]=1;
    })
    this.texto="¿Cuantos articulos deseas?";
  }

  listarItems():void{
    this.carrito=this.msg.agruparArticuloUsuario();
    localStorage.setItem('articulos', JSON.stringify(this.carrito));
  }

  deleteTask(task: Articulo) {
    this.msg.deleteArticulo(task);
    this.listarItems();
  }
  //Alan
  //esta funcion guarda en la tabla negocio y modifica la cantidad del articulo
  comprar(articulo:Articulo):void{
    var articuloCarrito : Articulo=new Articulo();
  }

  comprarArticulo(a : Articulo, cantidad:number, subtotal : number){
    //esta variable sirve para modificar el articulo
    var articuloCarrito : Articulo=new Articulo();
    var negocio : Negocio = new Negocio();
    var venta : Venta = new Venta();

    //
    if(localStorage.getItem('token')){

      if( cantidad > a.cantidad ){
        alertify.set('notifier','position', 'top-right');//posiscion
        alertify.error('Su compra fue cancelada por falta de artículos');

      }else{
        alertify.confirm('Confirmación de compra','¿Desea realizar la siguiente compra?',
        ()=>{//compilar codigo dentro de "alertify"
          alertify.set('notifier','position', 'top-right');//posiscion
          alertify.success('Ok');

          this.carrito.forEach((x,i)=>{
            if(x.idArticulo === a.idArticulo){
              x.cantidad=x.cantidad-cantidad;
              //-----Modificando el articulo------//
              articuloCarrito.idArticulo=x.idArticulo;
              articuloCarrito.nombre=x.nombre;
              articuloCarrito.precio=x.precio;
              articuloCarrito.categoria=x.categoria;
              articuloCarrito.detalle=x.detalle;
              articuloCarrito.estado=x.estado;
              articuloCarrito.idUsuario=x.idUsuario;
              articuloCarrito.fecha=x.fecha;
              articuloCarrito.src=x.src;
              articuloCarrito.nombreImagen=x.nombreImagen;
              articuloCarrito.imagen=x.imagen;
              articuloCarrito.cantidad=x.cantidad - cantidad;
              this.msg.addTask(x);
              //------Creando un nuevo negocio------//
              this.ventaService.idVenta().subscribe(val=>{
                negocio.cantidad = cantidad;
                negocio.precio = articuloCarrito.precio;
                negocio.subtotal = subtotal;
                negocio.idArticulo = articuloCarrito.idArticulo;
                negocio.estado=0;
                negocio.idVenta = val+1;
                this.negocioService.save(negocio).subscribe(val =>{
                  console.log(val);
                });
              });
              //----Creando venta-----//
              venta.total=subtotal;
              this.ventaService.save(venta).subscribe(val =>{
                console.log(val);
              });

            }
            //x.cantidad=n;
          });
          localStorage.setItem('articulos', JSON.stringify(this.carrito));
          this.articuloService.save(articuloCarrito, localStorage.getItem('id')).subscribe(val =>{
            console.log(val);
          });
          this.deleteTask(a);

        },
        function(){
          alertify.error('Compra cancelada');
        });
      }

    }//end iff token
    alertify.success('Inicie sesión')
    this.router.navigate(['/login'])


  }//end compraArticulos

  values = '';

  onKey(event: any, precio: number, index: number) { // without type info
    this.total=0;
    if(this.cont==false){
      this.cont=true;
      //this.arrayTotal=[];
    }

    for (let i=0; i < this.carrito.length; i++){
      if(i===index){
        this.arrayTotal[i] = parseFloat(event.target.value)*precio;
        this.arrayCantidad[i]=parseInt(event.target.value);
      }
      this.total=this.total+this.arrayTotal[i];
    }
  }

  comprarVenta(event: any){
    this.values += event.target.value + ' | ';
    //alert(this.total)
  }

  totalVenta(n,n2){
    const dato=n*n2;
    return dato;
  }

  comprarArticulos(){
    //esta variable sirve para modificar el articulo
    var articuloCarrito : Articulo=new Articulo();
    var negocio : Negocio = new Negocio();
    var venta : Venta = new Venta();

    this.ventaService.idVenta().subscribe(val=>{
      val=val+1;
      this.carrito.forEach((x,i) =>{
        //---Modificacion de cantidad articulo en local storage---/
        x.cantidad=x.cantidad-this.arrayCantidad[i];
        this.msg.addTask(x);
        //-----Modificando el articulo------//
        articuloCarrito.idArticulo=x.idArticulo;
        articuloCarrito.nombre=x.nombre;
        articuloCarrito.precio=x.precio;
        articuloCarrito.categoria=x.categoria;
        articuloCarrito.detalle=x.detalle;
        articuloCarrito.estado=x.estado;
        articuloCarrito.idUsuario=x.idUsuario;
        articuloCarrito.fecha=x.fecha;
        articuloCarrito.src=x.src;
        articuloCarrito.nombreImagen=x.nombreImagen;
        articuloCarrito.imagen=x.imagen;
        articuloCarrito.cantidad=x.cantidad;
        //------Creando un nuevo negocio------//
        this.ventaService.idVenta().subscribe(val=>{
          negocio.cantidad = this.arrayCantidad[i];
          negocio.precio = x.precio;
          negocio.subtotal = this.arrayTotal[i];
          negocio.idArticulo = x.idArticulo;
          negocio.estado=1;
          negocio.idVenta = val;
          this.negocioService.save(negocio).subscribe(val =>{
            console.log(val);
          });
        });
        this.articuloService.save(articuloCarrito,localStorage.getItem('id')).subscribe(val => {
          console.log(val);
        });
      });
      localStorage.setItem('articulos', JSON.stringify(this.carrito));

    });
    //----Creando venta-----//
    venta.total=this.total;
    this.ventaService.save(venta).subscribe(val =>{
      console.log(val);
    });
  }

}

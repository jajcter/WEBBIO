import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/models/venta/venta';
import { Negocio } from 'src/app/models/negocio/negocio';
import { Articulo } from 'src/app/models/articulo/articulo';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-venta-list',
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.css']
})
export class VentaListComponent implements OnInit {

  //
  ventasV:Venta[];
  negocioV:Negocio;
  articuloV:Articulo
  constructor(
    private ventaService:VentaService
  ) { }

  ngOnInit(): void {
    this. lisVentas();
  }

  lisVentas(){
    alert('si')
    this.ventaService.ventaUsuario().subscribe(sol=>{
      this.ventasV=sol;
    })
  }
}

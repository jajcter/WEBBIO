import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Articulo } from 'src/app/models/articulo/articulo';
import { ArticuloService } from 'src/app/services/articulo/articulo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faBiohazard, faMoneyBill, faInfo, faSave, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NewArticulo } from 'src/app/models/new-articulo';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {

  id_nuevo : number;
  form: FormGroup;
  submitted: boolean = false;

  faBiohazard =faBiohazard;
  faMoneyBill = faMoneyBill;
  faInfo = faInfo;
  faSave = faSave;
  faUserPlus = faUserPlus;
  faTimes = faTimes;

  @Input() articulo : Articulo;

  constructor(private articuloService : ArticuloService,
              private formBuilder: FormBuilder,
              private activatedRoute : ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.inputForm();
    this.cagarID();
  }

  cagarID(){
    console.log('lleva al ngOnInit - articulo Form')
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id']){
          this.id_nuevo=params['id'];
        }
        this.articulo.idUsuario=this.id_nuevo;
        console.log("Mira este objeto: " + this.articulo.nombre);
      }
    );
  }
  inputForm():void{
    this.form = this.formBuilder.group({
      precio:  [''],
      nombre:    ['', [Validators.required, Validators.maxLength(100)] ],
      categoria:  ['', [Validators.required] ],
      detalle:   ['', [Validators.required, Validators.maxLength(5000)] ],
      estado:      ['', [Validators.required, Validators.maxLength(12)] ],
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit() : void {
  this.cagarID()
console.log('Artivulo form')
console.log(this.articulo)
    this.submitted = true;

    if(this.form.invalid){
      console.error('Error en formulario');
      return;
    }

    this.articuloService.save(this.articulo,this.id_nuevo).subscribe(
      result => {
        this.submitted = false;
        //this.router.navigate(['usuarios']);
      }
    );
  }

  onReset() : void {
    this.submitted = false;
    this.form.reset();
    this.articulo = new Articulo();
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let alertify:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //
  form : FormGroup;
  //atributos-propiedades de la clase
  user={
    email:'',
    password:''
  }
  constructor(
    private authService: AuthService,
    private router:Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      password: ['',[Validators.required]],
      email: ['',[Validators.required]]
    });
  }

  singIn(){
    //this.user.email=this.user.email.toLowerCase();//minusculas
    //this.user.password=this.user.password.toLowerCase();//MAYUSCULAS
    if (this.form.valid){
      this.authService.singIn(this.user).subscribe(res=>{
        alertify.set('notifier','position', 'top-right');//posiscion
        alertify.success('Administrador: '+res.token +'id: '+res.id_logueado);

        localStorage.setItem('id',res.id_logueado)//guardamos el id del usuario logueado
        localStorage.setItem('token',res.token)//guardamos el token
        this.router.navigate(['/']);
      },err=>{
        alertify.set('notifier','position', 'top-right');
        alertify.warning('Acceso denegado');

      });
    }else{
      alertify.set('notifier','position', 'top-right');
      alertify.warning('Debe llenar el formulario');
    }
  }//end singIn()

}

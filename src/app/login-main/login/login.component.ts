import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {faBook} from '@fortawesome/free-solid-svg-icons';
declare let alertify:any;
//importaciones login social
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //
  user2: SocialUser;
  loggedIn: boolean;
  faBook=faBook
  form : FormGroup;
  //atributos-propiedades de la clase
  user={
    email:'',
    password:''
  }
  constructor(
    private authServices: AuthService,
    private router:Router,
    private formBuilder: FormBuilder,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user2 = user;
      this.loggedIn = (user != null);
    });
    this.form= this.formBuilder.group({
      password: ['',[Validators.required]],
      email: ['',[Validators.required]]
    });
  }

  singIn(){
    //this.user.email=this.user.email.toLowerCase();//minusculas
    //this.user.password=this.user.password.toLowerCase();//MAYUSCULAS
    if (this.form.valid){
      this.authServices.singIn(this.user).subscribe(res=>{
        alertify.set('notifier','position', 'top-right');//posiscion
        alertify.success('Administrador: Bienvenido' );
        this.addToken(res.id_logueado,res.token);

        this.router.navigate(['/']);
      },err=>{
        alertify.set('notifier','position', 'top-right');
        alertify.warning('Acceso denegado-' + localStorage.getItem('tInterceptor'));

      });
    }else{
      alertify.set('notifier','position', 'top-right');
      alertify.warning('Debe llenar el formulario correctamente');
    }
    localStorage.removeItem('tInterceptor');
  }//end singIn()

  //login y logout sociales
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  addToken(id_log,token){
    localStorage.setItem('id',id_log)//guardamos el id del usuario logueado
    localStorage.setItem('token',token)//guardamos el token
  }
}

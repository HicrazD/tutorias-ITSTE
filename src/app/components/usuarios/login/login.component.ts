import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  titulo:string = 'Iniciar sesion'
  usuario:Usuario
  u:Usuario
  isUsuarioOn:boolean = false
  constructor(public authService: AuthService,private router:Router,private usuarioService:UsuarioService) { 
    this.usuario = new Usuario()
    this.u = new Usuario()
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/home']);
    }
  }


  login():void{
    //console.log(this.usuario)
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error login','Username o password vacías','error')
    }

    this.filterUser()     
    
  }

  filterUser(){
    this.usuarioService.filtrarUsernambre(this.usuario.username).subscribe(u => {
      this.u = u
     // console.log(this.u)
      if(this.u.isLog == false){
        console.log('usuario no logeado ' + this.u.isLog)

        this.usuarioService.sessionLogin(this.u).subscribe(isLog => {
         // console.log('Metodo sesionnLogin en spring')
          //console.log(isLog)
          
        })
      }else if(this.u.isLog){
       // console.log('Usuario logeado ' + this.u.isLog)
       }
      
    })
    this.auth()
  }

  auth(){
    this.authService.login(this.usuario).subscribe(response =>{
      //console.log(response)

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/home'])
      Swal.fire('Login',`Hola ${usuario.username} has iniciado sesion con exito :3`,'success')
    },err => {
      if (err.status == 400) {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
      if (err.status == 500) {
        Swal.fire('Server?', 'No se pudo conectar con el servidor!', 'error');
      }

    })
  }
}

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
  btnPulsado:boolean = false
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
    this.btnPulsado = true
    //console.log(this.usuario)
    if(this.usuario.username == null || this.usuario.password == null){
      //Swal.fire('Error login','Username o password vacías','error')
    }
    if(this.btnPulsado){
      this.filterUser()
     // console.log('pulsado')
    }   
  }

  filterUser(){
    this.usuarioService.filtrarUsernambre(this.usuario.username).subscribe(u => {
      this.u = u  
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
      Swal.fire('Login',`Hola ${usuario.username} has iniciado sesion con exito`,'success')
    },err => {      
      this.btnPulsado = false
      if (err.status == 400) {
        Swal.fire('Error Iniciar Sesion', 'Usuario o clave incorrectas!', 'error');
      }
      if (err.status == 500) {
        Swal.fire('¿Servidor?', 'Hay problemas con el servidor!', 'error');
      }

    })
  }
}

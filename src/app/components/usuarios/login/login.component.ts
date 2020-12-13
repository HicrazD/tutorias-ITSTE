import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(public authService: AuthService,private router:Router) { 
    this.usuario = new Usuario()
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/home']);
    }
  }


  login():void{
    console.log(this.usuario)
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error login','Username o password vacías','error')
    }

    this.authService.login(this.usuario).subscribe(response =>{
      console.log(response)

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/home'])
      Swal.fire('Login',`Hola ${usuario.username} has iniciado sesion con exito :3`,'success')
    },err => {
      if (err.status == 400) {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    })
  }
}

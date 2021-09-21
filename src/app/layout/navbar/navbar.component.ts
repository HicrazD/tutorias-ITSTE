import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(public authService: AuthService, private router: Router,
    private usuarioService:UsuarioService) { 

    }
  logout(): void {
    let username = this.authService.usuario.username;
    this.usuarioService.sessionLogOut(this.authService.usuario).subscribe(isLog => {
    //  console.log('Metodo sesionnLogOut en spring')
    //  console.log(isLog)
    })
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

}

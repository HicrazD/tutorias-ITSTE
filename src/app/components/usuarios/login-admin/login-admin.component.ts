/*
Este codigo se puede optimisar si se pone en el componente de usuarop-admin
Si estas en residencia y tomaste este proyecto, te deseo suerte....
sacrificate, estudia y vera como todo sera mas facil :3 :'v

{--> DZC <--}
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Codigo } from 'src/app/models/codigo';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { CodigoService } from 'src/app/services/codigo.service';
import { RoleService } from 'src/app/services/role.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  codeSession: string = 'xpetodl.2020$%&'
  error: any
  block: boolean = true
  titulo: string = "Crear Usuarios"
  usuario: Usuario = new Usuario();
  role: Roles
  codigo: Codigo
  hide = true;
  constructor(private route: ActivatedRoute,
    private serviceRole: RoleService,
    private service: UsuarioService,
    private router: Router,
    private codigoService: CodigoService) {
    this.codigo = new Codigo()
  }

  ngOnInit() {
    const nombre: string = 'ROLE_ADMIN';
    this.serviceRole.filtrarRole(nombre)
      .subscribe(
        rn => {
          // console.log('Filter by nombre')
         // console.log(rn)
          this.role = rn
        },
        err => {
          if (err.status == 400) {
            this.error = err.error;
           // console.log(this.error);
            Swal.fire(`ROLE: ${nombre}`, `No existe ningun rol con ese nombre!`, 'error');
            this.router.navigate(['/home'])
          }
        }
      )
  }
  /*
    public createRol(): void {
      if (this.codigo.tipo === 'ADMIN') {
        console.log(this.codigo.tipo)
  
        this.service.createRol(this.usuario, this.role.id).subscribe(usuario => {
          //console.log(usuario);
          if (this.role.nombre == 'ROLE_ADMIN') {
            Swal.fire('Create', `Usuario ADMIN ${usuario.username} creado con exito!`, 'success');
            this.router.navigate(['/login'])
          }
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        })
      }
    }
  */
  public createAdmin() {
    if (!this.block) {
      if(this.usuario.password.length > 5)
     {
        this.service.createRol(this.usuario, this.role.id).subscribe(usuario => {
        //console.log(usuario);
        if (this.role.nombre == 'ROLE_ADMIN') {
          Swal.fire('Create', `Usuario ADMIN ${usuario.username} creado con exito!`, 'success');
          this.router.navigate(['/login'])
        }
      }, err => {
        if (err.status == 400) {
          this.error = err.error;
          console.log(this.error);
        }
      })
    }
    else {
      Swal.fire('La contraseña debe tener 6 caracteres o mas','','error')
    }
    }
  }

  Codigo(code: string) {
    code = code !== undefined ? code.trim() : '';
    if (code.length > 10 && code === this.codeSession) {
      this.block = false
    }
  }

  /*
  Codigo(code: string) {
    code = code !== undefined ? code.trim() : '';
    if (code.length > 10) {
      console.log(code)
      this.codigoService.verCodigo(code).subscribe(codigo => {
        this.codigo = codigo
      }, err => {
        if (err.status == 404) {
          this.error = err.error;
          Swal.fire({
            icon: 'question',
            title: 'No encontrado!',
            text: 'El codigo no existe en el sistema',
          })
          console.log(this.error);
        }

        if (err.status == 401) {
          this.error = err.error;
          Swal.fire({
            icon: 'error',
            title: 'Oh no!',
            text: 'No tienes acceso',
          })
          console.log(this.error);
        }
      })
    }
  }
*/
}

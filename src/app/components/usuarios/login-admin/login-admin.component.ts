/*
Este codigo se puede optimisar si se pone en el componente de usuarop-admin
Si estas en residencia y tomaste este proyecto, te deseo suerte....
sacrificate, estudia y vera como todo sera mas facil :3 :'v

{--> DZC <--}
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { RoleService } from 'src/app/services/role.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  error: any
  titulo: string = "Crear Usuarios"
  usuario: Usuario = new Usuario();
  role: Roles
  constructor(private route: ActivatedRoute,
    private serviceRole: RoleService,
    private service: UsuarioService,
    private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const nombre: string = params.get('term');
      if (nombre)
        this.serviceRole.filtrarRole(nombre)
          .subscribe(
            rn => {
              console.log('Filter by nombre')
              console.log(rn)
              this.role = rn
            },
            err => {
              if (err.status == 400) {
                this.error = err.error;
                console.log(this.error);
                Swal.fire(`ROLE: ${nombre}`, `No existe ningun rol con ese nombre!`, 'error');
                this.router.navigate(['/home'])
              }
            }
          )
    })
  }

  public createRol(): void {

    this.route.paramMap.subscribe(params => {
      const term: string = params.get('term');
      if (term) {
        this.service.createRol(this.usuario, this.role.id).subscribe(usuario => {
          console.log(usuario);
          if (this.role.nombre == 'ROLE_ADMIN') {
            Swal.fire('Create', `Usuario ADMIN ${usuario.username} creado con exito!`, 'success');
            this.router.navigate(['/home'])
          }
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        })
      }
    })

  }

}

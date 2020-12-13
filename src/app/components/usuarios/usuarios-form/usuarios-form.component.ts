import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { RoleService } from 'src/app/services/role.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { CommonListarComponent } from '../../alumnos/common-listar.component';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent
  extends CommonListarComponent<Usuario, UsuarioService> implements OnInit {

  usuario: Usuario = new Usuario();
  role: Roles
  constructor(router: Router, service: UsuarioService, private serviceRole: RoleService,
    private route: ActivatedRoute) {
    super(service, router)
    this.titulo = "Crear de Usuarios"
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const nombre: string = params.get('term');
      if (nombre)
        this.serviceRole.filtrarRole(nombre).subscribe(rn => {
          console.log('Filter by nombre')
          console.log(rn)
          this.role = rn
        })
    })

  }
  public crear(): void {
    this.service.crear(this.usuario).subscribe(usuario => {
      console.log(usuario);
      alert(`Usuario ${usuario.username} creado con exito`);
      this.router.navigate(['/login']);
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
        console.log(this.error);
      }
    })
  }

  public createRol(): void {

    this.route.paramMap.subscribe(params => {
      const term: string = params.get('term');

      if (term) {
        if (term == 'ROLE_ADMIN') {
          Swal.fire('Precaution', `No tienes permitido crear Usuario con con Rol: ${term}!`, 'warning');
         return  this.router.navigate(['/login'])
        } else {
          this.service.createRol(this.usuario, this.role.id).subscribe(usuario => {
            console.log(usuario);

            if (this.role.nombre == 'ROLE_ALUMNO') {
              Swal.fire('Create', `ALUMNO ${usuario.username} creado con exito!`, 'success');
              this.router.navigate(['/login'])
            }
            if (this.role.nombre == 'ROLE_DOCENTE') {
              Swal.fire('Create', `DOCENTE ${usuario.username} creado con exito!`, 'success');
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
    })

  }
}

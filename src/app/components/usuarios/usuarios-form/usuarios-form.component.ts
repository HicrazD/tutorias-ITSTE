import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Codigo } from 'src/app/models/codigo';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { CodigoService } from 'src/app/services/codigo.service';
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
  btnPulsado: boolean = true
  usuario: Usuario = new Usuario();
  role: Roles
  nombreRol: string
  codigo: Codigo
  hide = true;
  hide2 = true;
  estatus: boolean = true
  constructor(router: Router, service: UsuarioService,
    private serviceRole: RoleService,
    private route: ActivatedRoute,
    private codigoService: CodigoService) {
    super(service, router)
    this.titulo = "Crear Usuarios"
    this.codigo = new Codigo()
  }

  ngOnInit() {
   this.usuario.username = ""
   this.usuario.password = ""
  }

  buscarRole(nombre: string) {
    this.serviceRole.filtrarRole(nombre).subscribe(rn => {
      // console.log(rn)
      this.role = rn
      this.estatus = false
    })
  }

  Codigo(code: string) {
    code = code !== undefined ? code.trim() : '';
    if (code.length > 10) {
      // console.log(code)
      this.codigoService.verCodigo(code).subscribe(codigo => {
        this.codigo = codigo
        if (codigo.tipo === 'ALUMNO') { this.nombreRol = 'ROLE_ALUMNO' }
        if (codigo.tipo === 'DOCENTE') { this.nombreRol = 'ROLE_DOCENTE' }
        this.buscarRole(this.nombreRol)
      }, err => {
        if (err.status == 404) {
          this.error = err.error;
          Swal.fire({
            icon: 'question',
            title: 'No encontrado!',
            text: 'El codigo no existe en el sistema',
          })
          //  console.log(this.error);
        }

        if (err.status == 401) {
          this.error = err.error;
          Swal.fire({
            icon: 'error',
            title: 'Oh no!',
            text: 'No tienes acceso',
          })
          //  console.log(this.error);
        }
      })
    }
  }

  public createRol(): void {
    this.btnPulsado = false
    if (this.usuario.username.length < 6 || this.usuario.password.length < 6) {
      Swal.fire('Error', `1.- usuario debe tener almenos 6 caracteres   2.- contraseña
      debe tener almenos 6 caracteres `, 'warning');
      this.btnPulsado = true
    } else {
      if (!this.estatus) {
        this.service.createRol(this.usuario, this.role.id).subscribe(usuario => {
          //  console.log(usuario);

          if (this.role.nombre == 'ROLE_ALUMNO') {
            Swal.fire('Create', `ALUMNO ${usuario.username} creado con exito!`, 'success');
            this.router.navigate(['/login'])
          }
          if (this.role.nombre == 'ROLE_DOCENTE') {
            Swal.fire('Create', `DOCENTE ${usuario.username} creado con exito!`, 'success');
            this.router.navigate(['/login'])
          }
        }, err => {
          this.btnPulsado = true
          if (err.status == 400) {
            this.error = err.error;
            // console.log(this.error);
          }
          if(err.status == 500){
            Swal.fire('Opss', `Probablemente ese alias no este disponible`, 'error');
          }
        })
      }
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { RoleService } from 'src/app/services/role.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { CommonListarComponent } from '../../alumnos/common-listar.component';

@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.css']
})
export class RolUsuarioComponent implements OnInit {
  title: string = 'Modificar contraseña'
  error: any
  usuario: Usuario;
  contra1: string = ''
  contra2: string = ''
  constructor(private service: UsuarioService, private route: ActivatedRoute,
    private router: Router) {
    this.usuario = new Usuario()
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id')
      if (id)
        this.service.ver(id).subscribe(u => {
          this.usuario = u
        })
    })
  }

  editarUsuario(): void {
    if (this.contra1.length < 6 || this.contra2.length < 6) {
      Swal.fire('Erorr:', `La contraseña debe tener almenos 6 caracteres`, 'warning');
    } else {
      if (this.contra1 === this.contra2) {
        this.usuario.password = this.contra2
        this.service.editar(this.usuario).subscribe(m => {
          //console.log(m);
          Swal.fire('Modificado:', `Contraseña actualizada con éxito`, 'success');
          this.router.navigate([`/docentes/form/docente-perfil/${this.usuario.username}`]);
        }, err => {
          if (err.status === 400 || err.status === 500) {
            this.error = err.error;
            //console.log(this.error);
          }
        });
      } else Swal.fire('Error:', `Los campos no coinciden`, 'error');
    }
  }
}

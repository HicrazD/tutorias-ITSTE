import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { RoleService } from 'src/app/services/role.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  constructor(private router: Router, service: UsuarioService,
    private route: ActivatedRoute, private rolService: RoleService) {
    super(service)
    this.titulo = "Crear de Usuarios"
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id)
        this.rolService.ver(id).subscribe(r => {
          console.log(r)
          this.role = r
        })
    })

  }
  public crear(): void {
    this.service.crear(this.usuario).subscribe(usuario => {
      console.log(usuario);
      alert(`Usuario ${usuario.username} creado con exito`);
      this.router.navigate(['/login']);
    })
  }

  public createRol(): void {
     
      this.route.paramMap.subscribe(params => {
        const id: number = +params.get('id');
        if (id) {
          this.service.createRol(this.usuario, id).subscribe(usuario => {
            console.log(usuario);
            
            if (this.role.role == 'ROLE_ALUMNO'){
              alert(`Usuario ${usuario.username} creado con exito`);
              this.router.navigate(['/alumnos/form/alumno-perfil/'+usuario.username])
            }
            else{
              alert(`Usuario ${usuario.username} creado con exito`);
              this.router.navigate(['/docentes/form/docente-perfil/'+usuario.username])
            }
          })
        }
      })
    
      }
}

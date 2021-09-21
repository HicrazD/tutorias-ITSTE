import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit { //extends CommonListarComponent<Usuario,UsuarioService> se kito esta parte
  //para experimentar otra forma de poner paginacion con angular material
  loading:boolean
  titulo = "Lista de usuarios"
  error:any
  usuarios: Usuario[]
  usuariosAdmin: Usuario[]
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  tabIndex = 0;
  mostrarColumnasUsuarios: string[] = ['id', 'username', 'editar'];
  mostrarColumnasUsuarios2: string[] = ['id', 'username', 'roles'];
  mostrarColumnasRoles: string[] = ['nombre'];

  constructor(private service: UsuarioService, public authService: AuthService, private router: Router) { 
    this.loading = true
    this.usuarios = []
  }


  ngOnInit() {
    this.service.listar().subscribe(user => {
      this.usuarios = user.filter(u => {
        if (u.roles.length < 2) {
          return true
        }
      })
      this.usuariosAdmin = user.filter(u => {
        if (u.roles.length > 1) {
          return true
        }
      })
      this.iniciarPaginador()
    })
  }

  iniciarPaginador(): void{
    this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
    this.dataSource.paginator = this.paginator;
    this.loading = false
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*
  public eliminar(usuario: Usuario): void {
    this.loading = true
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(usuario.id).subscribe(() => {
          // this.listar = this.listar.filter(a => a !== e);
          this.service.listar().subscribe(user => {
            this.usuariosAdmin = user.filter(u => {
              if (u.roles.length > 1) { return true }
            })
          })
          this.loading = false
          Swal.fire('Eliminado:', `Usuario eliminado con éxito`, 'success');
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            Swal.fire('Oops...:', `No se completo la peticion`, 'question');
           // console.log(this.error);
          }

          if (err.status == 500) {
            this.error = err.error;
            Swal.fire('Oops...:500', `Problemas en el servidor, Contactar al servio técnico`, 'question');
            //console.log(this.error);
          }
        });
      }
    });

  }
*/
}

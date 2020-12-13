import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit { //extends CommonListarComponent<Usuario,UsuarioService> se kito esta parte
  //para experimentar otra forma de poner paginacion con angular material
  titulo = "Lista de usuarios"
  usuarios: Usuario[]
  usuariosAdmin: Usuario[]
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  tabIndex = 0;
  mostrarColumnasUsuarios: string[] = ['id', 'username', 'editar'];
  mostrarColumnasUsuarios2: string[] = ['id', 'username', 'roles'];
  mostrarColumnasRoles: string[] = ['id', 'nombre'];

  constructor(private service: UsuarioService, public authService: AuthService, private router: Router) { }


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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonListarComponent } from '../alumnos/common-listar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit { //extends CommonListarComponent<Usuario,UsuarioService> se kito esta parte
  //para experimentar otra forma de poner paginacion con angular material
  usuariosDocente: Usuario[] = []
  usuariosAlumno: Usuario[] = []
  titulo = "Lista de usuarios"

  dataSource: MatTableDataSource<Usuario>;
  dataSourceDocente: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginatorDocente: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  tabIndex = 0;
  mostrarColumnasUsuarios: string[] = ['id', 'username', 'editar'];


  constructor(private service: UsuarioService) { }


  ngOnInit() {
    this.service.UsuarioRoleAlumno().subscribe(ua => {
      console.log(ua + ' list student user')
      this.usuariosAlumno = ua
      this.iniciarPaginador();
    })

    this.service.UsuarioRoleDocente().subscribe(ud => {
      console.log(ud + ' list docente user')
      this.usuariosDocente = ud
      this.iniciarPaginador();
    })

  }

  iniciarPaginador(): void {
    this.dataSource = new MatTableDataSource<Usuario>(this.usuariosAlumno);
    this.dataSource.paginator = this.paginator;
        
    this.dataSourceDocente = new MatTableDataSource<Usuario>(this.usuariosDocente);
    this.dataSourceDocente.paginator = this.paginatorDocente;
  }

}

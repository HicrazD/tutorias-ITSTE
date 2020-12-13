import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {


  titulo: string = "Listado de alumnos"
  listar:Alumno[] = []
  mostrarColumnasAlumnos: string[] = [
    'id', 'nombre', 'apellido',
    'correo', 'carrera',
    'semestre', 'promAsistencia', 'editar', 'eliminar'
  ];

  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeOptions: number[] = [4, 5, 10, 20, 50];
  constructor(private service: AlumnoService,public authService: AuthService) {}  

  ngOnInit(){
    this.service.listar().subscribe(alumno => {
      this.listar = alumno
      this.iniciarPaginador();
    })

  }

  iniciarPaginador(): void{
    this.dataSource = new MatTableDataSource<Alumno>(this.listar);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

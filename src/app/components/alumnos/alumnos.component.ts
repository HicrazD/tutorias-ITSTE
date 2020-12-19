import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  error:any
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


  public eliminar(e: Alumno): void {

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
        this.service.eliminar(e.id).subscribe(() => {
          // this.listar = this.listar.filter(a => a !== e);
          this.iniciarPaginador();
          Swal.fire('Eliminado:', `alumno eliminado con éxito`, 'success');
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
      }
    });

  }
}

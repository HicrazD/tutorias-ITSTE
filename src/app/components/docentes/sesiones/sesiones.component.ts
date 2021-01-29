import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Docente } from 'src/app/models/docente';
import { Sesion } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocenteService } from 'src/app/services/docente.service';
import { SesionService } from 'src/app/services/sesion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { AsistenciasModelComponent } from '../../asistencias/asistencias-model/asistencias-model.component';
import { InformeAsistenciasComponent } from '../../reportes-plantilla/informe-asistencias/informe-asistencias.component';
import { PatComponent } from '../../reportes-plantilla/pat/pat.component';


@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {
  error: any
  usuario: Usuario
  sesiones: Sesion[] = []
  docente: Docente
  asistencias: Asistencia[]
  alumnos: Alumno[] = []
  displayedColumns: string[] = ['numSesion', 'tema', 'modalidad', 'fecha', 'asistencias','asignar', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Sesion>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, public authService: AuthService,
    private router: Router, private alumnoService: AlumnoService,
    private docenteService: DocenteService, private sesionService: SesionService,
    private usuarioService: UsuarioService,public dialog: MatDialog) {

    // Assign the data to the data source for the table to render
    this.usuario = new Usuario()
    this.docente = new Docente()
    this.asistencias = []

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.usuarioService.filtrarUsernambre(username).subscribe(u => {
          //     console.log(u)
          this.usuario = u
        })
    })
    this.docenteEndPoint()

  }

  enviarTablaSesiones(): void{
    const modalRef = this.dialog.open(PatComponent, {
      width: '1000px',
      height:'1300px',
      data: {docente: this.docente, sesiones: this.sesiones}
    });
  }

  btnRIAT(): void{
    const modalRef = this.dialog.open(InformeAsistenciasComponent, {
      width: '1000px',
      height:'1300px',
      data: {docente: this.docente, sesiones: this.sesiones}
    });
  }

  mostrarAsistencias(sesion:Sesion): void{
   // console.log(' MEtodo mostrarAsistencias' )
   // console.log(sesion)   
    const modalRef = this.dialog.open(AsistenciasModelComponent, {
      width: '1000px',
      data: {docente:this.docente,sesion:sesion}
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  IniciarPaginador() {
    this.dataSource = new MatTableDataSource(this.sesiones)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  asignarAlumnos(sesion: Sesion) {
    
    this.alumnoService.crearYAsignarAsistencia(sesion, this.alumnos).subscribe(() => {
      this.encontrarSesionesPorDocente()
      this.IniciarPaginador()
    }, err => {
      this.error = err.error
    //  console.log(this.error)
    })  ;  
  }

  eliminar(sesion: Sesion) {

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
        this.docenteService.eliminarSesion(this.docente.id, sesion).subscribe(d => {
          this.docente = d
          this.sesiones = this.docente.sesiones
          this.IniciarPaginador()
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
        this.sesionService.eliminar(sesion.id).subscribe(s => {
        //  console.log(s)
          Swal.fire('Eliminado:', `Sesion eliminada con éxito`, 'success');
        }, err => {
          this.error = err.error
          console.log(this.error)
        });
      }
    });
  }

  encontrarSesionesPorDocente(){
    this.sesionService.encontrarSesionesPorDocente(this.docente).subscribe(sesiones=>{
     // console.log('metodo encontrarSesionesPorDocente')
     this.docenteEndPoint()
      
     // console.log(this.sesiones)
    })
  }
  docenteEndPoint(){
    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.docenteService.filtrarPorUsuarioUsername(username).subscribe(u => {
          //   console.log(u)
          if (u)
          
            this.docente = u
          //  console.log(this.docente)
          this.sesiones = this.docente.sesiones
          this.sesiones.map(s => {
            this.alumnos = s.alumnos
         //  console.log(this.alumnos)
          })
        //  console.log(this.sesiones)
          this.IniciarPaginador()
        })
    })
  }
}

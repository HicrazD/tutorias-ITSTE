import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DocenteService } from 'src/app/services/docente.service';
import { Docente } from 'src/app/models/docente';
import { Sesion } from 'src/app/models/sesion';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { SesionService } from 'src/app/services/sesion.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { ResultadoService } from 'src/app/services/resultado.service';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  loading:boolean
  filtrar: any
  error: any
  titulo: string = "Lista de alumnos"
  listar: Alumno[] = []
  alumnosDoocente: Alumno = new Alumno()
  docente: Docente
  docentes: Docente[]
  sesiones: Sesion[] = []
  asistenciasEliminar: Asistencia[]
  mostrarColumnasAlumnos: string[] = [
    'id', 'nombre', 'apellido',
    'correo', 'carrera',
    'semestre', 'promAsistencia', 'editar', 'eliminar'
  ];

  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [4, 5, 10, 20, 50];
  constructor(private service: AlumnoService, public authService: AuthService,
    public docenteService: DocenteService, public asistenciaService: AsistenciaService,
    public sesionService: SesionService, public respuestaService:RespuestaService,
    public resultadoService:ResultadoService) {
      this.loading = true
  }

  ngOnInit() {
    this.service.listar().subscribe(alumno => {
      this.listar = alumno
      // this.iniciarPaginador(); 
      this.dataSource = new MatTableDataSource<Alumno>(this.listar);
      this.iniciarPaginador();
    })
  }
  listAlumnos(): void {
    this.service.listar().subscribe(alumno => {
      this.listar = alumno
      // this.iniciarPaginador(); 
      this.dataSource = new MatTableDataSource<Alumno>(this.listar);
      this.iniciarPaginador();
    })
  }

  iniciarPaginador(): void {
    this.dataSource.paginator = this.paginator;
    this.loading = false
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarAlumnodeDocente(a: Alumno) {
    this.docenteService.obtenerDocentePorAlumnoId(a).subscribe(docente => {
      if (docente) {
        //console.log("Si existe docente")
        //console.log(docente)
        this.docenteService.ver(docente.id).subscribe(d => {

          this.sesiones = d.sesiones
          if (this.sesiones.length > 0) {
            this.asistenciaService.encontrarAsistenciaPorAlumno(a).subscribe(asistencias => {
              if (asistencias.length > 0) {
                //  console.log("Existe: docente,sesiones,asistencias")
                this.borrarTodo(d, a)
              } else {
                //  console.log("Existe alumno,docente y sesion Borrar sesion , borrar alumno de docente, borrar alumno")
                this.borrarSesionesYDocente(d, a)
              }
            })
          } else {
            //  console.log("Existe Alumno y Docente  borra alumno de Docente y alumno")
            this.docenteService.eliminarAlumno(d, a).subscribe(() => {
              this.eliminarRespuestas(a)
            }
              , err => {
                if (err.status == 400) {
                  this.error = err.error;
                  //  console.log(this.error);
                }
              });
          }
        });
      } else {
        //  console.log("Existe Alumno pero no docente: Borraralumno")
        //console.log(docente)

        this.sesionService.encontrarSesionesPorAlumno(a.id).subscribe(sesiones => {

          if (sesiones.length > 0) {
            this.sesiones = sesiones;
            this.sesiones = this.sesiones.map(sesion => {
              sesion.alumnos = sesion.alumnos.filter(alumno => alumno.id != alumno.id)
              sesion.asistencias = sesion.asistencias.filter(asistencia => asistencia.alumno.id != a.id)              //  console.log(sesion.asistencias)
              return sesion
            });
            this.sesionService.guardarSesiones(this.sesiones).subscribe(() => {
              this.asistenciaService.encontrarAsistenciaPorAlumno(a).subscribe((asistencias) => {
                if (asistencias.length > 0) {
                  this.asistenciaService.eliminarListaAsistencia(asistencias).subscribe(() => {
                    this.eliminarRespuestas(a)
                  });
                }
              });
            });
          } else { this.eliminarRespuestas(a) }
        });
      }
    }, err => {
      if (err.status == 400) {
        this.error = err.error;
        //  console.log(this.error);
      }
    })
  }
  // ********             Borrar Alumno de sesiones, alumno de docentes y alumno
  borrarSesionesYDocente(docente: Docente, alumno: Alumno) {
   // console.log('entro en borrarSesionesYDocente ')
    this.sesiones = this.sesiones.map(sesion => {
      sesion.alumnos = sesion.alumnos.filter(alumno => alumno.id != alumno.id)
      sesion.asistencias = sesion.asistencias.filter(asistencia => asistencia.alumno.id != alumno.id)
      //  console.log(sesion.asistencias)
      return sesion
    })
    docente.sesiones = this.sesiones
    this.docenteService.editar(docente).subscribe(docente => {
      //  console.log(docente)
      this.docenteService.eliminarAlumno(docente, alumno).subscribe(() => {
        this.eliminarRespuestas(alumno)
      })
    })
  }
  // ********** Borrar Alumno de sesiones, Alumno de Docente, Asistencias de alumno y alumno
  borrarTodo(docente: Docente, alumno: Alumno) {
   // console.log('entro en borrarTodo ')
    this.sesiones = this.sesiones.map(sesion => {
      sesion.alumnos = sesion.alumnos.filter(alumno => alumno.id != alumno.id)
      sesion.asistencias = sesion.asistencias.filter(asistencia => asistencia.alumno.id != alumno.id)
      //console.log(sesion.asistencias)
      return sesion
    })
    docente.sesiones = this.sesiones
    //  console.log(docente)
    this.docenteService.editar(docente).subscribe(docente => {
      //    console.log(docente)
      this.asistenciasPorAlumno(alumno, docente)
    })
  }
  // borrar asistencias de alumno con borrar solo alumno
  asistenciasPorAlumno(alumno: Alumno, docente: Docente) {
    this.asistenciaService.encontrarAsistenciaPorAlumno(alumno).subscribe(asistencias =>
      this.asistenciaService.eliminarListaAsistencia(asistencias).subscribe(() => {
        //Swal.fire('Eliminado:', `Asistencias eliminadas con éxito`, 'success');
        this.docenteService.eliminarAlumno(docente, alumno).subscribe(() => {
          this.eliminarRespuestas(alumno)
        })
      })
    )
  }

  // Eliminar si existe Respuestas y Resultados
  eliminarRespuestas(alumno:Alumno){
   // console.log('entro en eliminarRespuestas ')
    this.respuestaService.obtenerRespuestasPorAlumno(alumno.id).subscribe(respuestasId => {
      if(respuestasId.length > 0) {
       // console.log(respuestasId)
        this.respuestaService.eliminarRespuestasPorAlumno(respuestasId).subscribe(ids => 
          {
           // console.log('Estas son las ids del metodo eliminarRespuestas')
         //   console.log(ids)
         this.eliminarResultados(alumno)
          });
      }else{this.borrarAlumno(alumno)}
    });   
  }

  eliminarResultados(alumno:Alumno){
    // console.log('entro en eliminarResultados ')
    this.resultadoService.buscarResultadoIdsPorAlumnoId(alumno.id).subscribe(ids => {
      if(ids.length > 0){
        console.log(ids)
        this.resultadoService.eliminarResultadoIdsPorAlumnoId(ids).subscribe(ids =>
          {
          //  console.log("Ids elminadas")
          //  console.log(ids)
          this.borrarAlumno(alumno)
          });
      }
    });
  }

  //Borrar alumno
  borrarAlumno(alumno: Alumno) {
    this.service.eliminarAlumno(alumno.id).subscribe(() => {
      this.listAlumnos()
      Swal.fire('Eliminado:', `Alumno eliminado con éxito`, 'success');
    }, err => {
      if (err.status == 400) {
        this.error = err.error;
        //  console.log(this.error);
      }
    });
  }

  public eliminar(alumno: Alumno): void {

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

        this.eliminarAlumnodeDocente(alumno)

      }
    });

  }

  exportexcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData)
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    FileSaver.saveAs(data, 'Alumnos' + '_export_' + '.xlsx')
  }
}

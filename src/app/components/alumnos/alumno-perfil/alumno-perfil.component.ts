import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_BAKEND } from 'src/app/config/config';
import { Alumno } from 'src/app/models/alumno';
import { Archivo } from 'src/app/models/archivo';
import { Asistencia } from 'src/app/models/asistencia';
import { Docente } from 'src/app/models/docente';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ArchivoService } from 'src/app/services/archivo.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

//http://localhost:8080/api/archivos/uploads/file-pdf/{{a.id}} 
// Recodar poner una tabla en ves donde esta los inputs del button editar
@Component({
  selector: 'app-alumno-perfil',
  templateUrl: './alumno-perfil.component.html',
  styleUrls: ['./alumno-perfil.component.css']
})
export class AlumnoPerfilComponent implements OnInit {
  urlBackend = URL_BAKEND
  docente: Docente
  selected = 'None';
  usuario: Usuario
  archivos: Archivo
  alumnos: Alumno = new Alumno()
  alumno: Alumno
  asistencias: Asistencia[] = []
  presente: Asistencia[]
  error: any
  tabIndex = 0;
  semestre = [
    { valor: 'PRIMERO', muestraValor: 'PRIMERO' },
    { valor: 'SEGUNDO', muestraValor: 'SEGUNDO' },
    { valor: 'TERCERO', muestraValor: 'TERCERO' },
    { valor: 'CUARTO', muestraValor: 'CUARTO' },
    { valor: 'QUINTO', muestraValor: 'QUINTO' },
    { valor: 'SEXTO', muestraValor: 'SEXTO' },
  ];

  grupo = [
    { valor: 'A', muestraValor: 'A' },
    { valor: 'B', muestraValor: 'B' },
    { valor: 'C', muestraValor: 'C' },
    { valor: 'D', muestraValor: 'D' },
  ];

  carrera = [
    { valor: 'ISC', muestraValor: 'ISC' },
    { valor: 'IAD', muestraValor: 'IAD' },
    { valor: 'GAS', muestraValor: 'GAS' },
    { valor: 'LOG', muestraValor: 'LOG' },
    { valor: 'IDC', muestraValor: 'IDC' },
  ];

  mostrarColumnasArchivos: string[] = [
    'id', 'nombre', 'comentario',
    'tipo', 'archivo', 'editar', 'eliminar'
  ];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService,
    private archivoService: ArchivoService,
    private asistenciaService: AsistenciaService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.usuarioService.filtrarUsernambre(username).subscribe(u => {
         //  console.log(u)
          this.usuario = u
        })
    })

    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.alumnoService.filtrarPorUsuarioUsername(username).subscribe(alumno => {
          //console.log(alumno)
          if (alumno) {
            this.alumno = alumno
            this.alumnoService.filtrarDocentePorAombre(alumno).subscribe(
              docente => { this.docente = docente }
              , err => {
                if (err.status == 400) {
                  this.error = err.error;
                  console.log(this.error);
                }
              }
            )
          }
          this.alumnoService.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => {
            if (au) { this.archivos = au }
          })
        })
    })


  }


  public createAlumno(): void {
    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term');
      if (username) {
        this.alumnoService.crearPorUsuarioId(this.alumnos, username)
          .subscribe(alumno => {
           // console.log(alumno);
          //  alert(`Alumno ${alumno.nombre} creado con exito`);            
            this.router.navigate(['/home']);
            Swal.fire('Exito!',`${alumno.nombre} Tu perfil fue creado exitosamente`,'success')
          }, err => {
            if (err.status === 400) {
              this.error = err.error;
              console.log(this.error);
            }
          })
      }
    })
  }

  public editar(): void {
    this.alumnoService.editar(this.alumno).subscribe(m => {
    //  console.log(m + 'usuario actualisado segun');
      Swal.fire('Modificado:', `Alumno actualizado con éxito`, 'success');
      this.router.navigate([`/alumnos/form/${this.alumno.id}`]);
    }, err => {
      if (err.status == 400) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public eliminarArchivo(archivo: Archivo): void {

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
        this.archivoService.eliminar(archivo.id).subscribe(() => {
          // this.listar = this.listar.filter(a => a !== e); /alumnos/form/alumno-perfil/dociman
          Swal.fire('Eliminado:', `${archivo.nombre} eliminado con éxito`, 'success');
          this.router.navigate(['/home']);
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
      }
    });

  }

  mostrarArchivos() {
    this.usuario = this.alumno.usuario
   // console.log(this.usuario)
    this.alumnoService.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => {
      if (au) { this.archivos = au }
    })
  }

  asistenciasAlumno() {
    this.asistenciaService.encontrarAsistenciaPorAlumno(this.alumno).subscribe(asistencias => {

      this.asistencias = asistencias
      this.presente = asistencias.filter(a => a.statusAsistencia)
     // console.log('presente {' + this.presente.length + '}')
     // console.log('asistencias {' + this.asistencias.length + '}')
      this.alumno.promAsistencia = (this.presente.length * 100)/( this.asistencias.length)
    })
  }

  redireccion(archivo: Archivo) {
   // console.log('redireccion')
   // console.log(archivo)
    if (archivo.tipo === 'PDF') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-pdf/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'WORD') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-word/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'EXCEL') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-excel/${archivo.id}`, "_blank")
    }
  }
}

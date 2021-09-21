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
import { AuthService } from 'src/app/services/auth.service';
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
  btnPulsado: boolean = true
  urlBackend = URL_BAKEND
  docente: Docente
  title: string = 'Cambiar Contraseña'
  selected = 'None';
  usuario: Usuario
  contra1: string = ''
  contra2: string = ''
  archivos: Archivo []
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
    { valor: 'SEPTIMO', muestraValor: 'SEPTIMO' },
    { valor: 'OCTAVO', muestraValor: 'OCTAVO' },
    { valor: 'NOVENO', muestraValor: 'NOVENO' }
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
  constructor(private route: ActivatedRoute, public authService: AuthService,
    private router: Router,
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService,
    private archivoService: ArchivoService,
    private asistenciaService: AsistenciaService) {
    this.alumno = new Alumno()
    this.docente = new Docente()
    this.usuario = new Usuario()
  }

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
          // console.log(alumno)
          if (alumno) {
            this.alumno = alumno
            // console.log(this.alumno)
            this.alumnoService.filtrarDocentePorAlumno(alumno).subscribe(
              docente => {
                this.docente = docente
                //  console.log(docente)
              }
              , err => {
                if (err.status == 400) {
                  this.error = err.error;
                  //  console.log(this.error);
                }
              });
          }
          this.alumnoService.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => {
            this.archivos = au
          })
        })
    })


  }

  btnOptener() {
    // console.log(this.alumno)
  }
  public crear(): void {
    this.btnPulsado = false
    if (!this.btnPulsado) {
      this.route.paramMap.subscribe(params => {
        const username: string = params.get('term');
        if (username) {
          //console.log(username)
          // this.alumno.id = 0
          // console.log(this.alumno)
          this.alumnoService.crearPorUsuarioId(this.alumno, username)
            .subscribe(alumno => {
              this.btnPulsado = true
              this.alumno = alumno
              // console.log(alumno);
              //  alert(`Alumno ${alumno.nombre} creado con exito`);            
              this.router.navigate([`/alumnos/form/alumno-perfil/${this.authService.usuario.username}`]);
              Swal.fire('Exito!', `${alumno.nombre} Tu perfil fue creado exitosamente`, 'success')
            }, err => {
              this.btnPulsado = true
              if (err.status === 400) {
                this.error = err.error;
                //console.log(this.error);
              }
            })
        }
      });
    }
  }

  public editar(): void {
    this.btnPulsado = false
    if (!this.btnPulsado) {
      this.alumnoService.editar(this.alumno).subscribe(m => {
        this.btnPulsado = true
        //  console.log(m + 'usuario actualisado segun');
        Swal.fire('Modificado:', `Actualizacion de datos correctamente`, 'success');
        this.router.navigate([`/alumnos/form/alumno-perfil/${this.authService.usuario.username}`]);
      }, err => {
        this.btnPulsado = true
        if (err.status == 400) {
          this.error = err.error;
          //console.log(this.error);
        }
      });
    }
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
          this.router.navigate([`/alumnos/form/alumno-perfil/${this.authService.usuario.username}`]);
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            //  console.log(this.error);
          }
        });
      }
    });

  }

  mostrarArchivos() {
    this.usuario = this.alumno.usuario
    // console.log(this.usuario)
    this.alumnoService.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => {
      this.archivos = au 
    })
  }

  asistenciasAlumno() {
    this.asistenciaService.encontrarAsistenciaPorAlumno(this.alumno).subscribe(asistencias => {

      this.asistencias = asistencias
      this.presente = asistencias.filter(a => a.statusAsistencia)
      // console.log('presente {' + this.presente.length + '}')
      // console.log('asistencias {' + this.asistencias.length + '}')
      this.alumno.promAsistencia = (this.presente.length * 100) / (this.asistencias.length)
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

  acceso(): boolean {
    if (this.authService.hasRole('ROLE_ALUMNO')) return false
    else return true
  }

  editarUsuario(): void {
    if (this.contra1 === this.contra2 && this.contra1.length > 7 && this.contra2.length > 7) {
      this.usuario.password = this.contra2
      this.usuarioService.editar(this.usuario).subscribe(m => {
        //console.log(m);
        Swal.fire('Modificado:', `Contraseña actualizada con éxito`, 'success');
        this.router.navigate([`/alumnos/form/alumno-perfil/${this.authService.usuario.username}`]);
      }, err => {
        if (err.status === 400 || err.status === 500) {
          this.error = err.error;
          //console.log(this.error);
        }
      });
    } else Swal.fire('Error:', `1) Los campos no coinciden 2) La contraseña debe ser mayor a 8 caracteres`, 'error');
  }
}

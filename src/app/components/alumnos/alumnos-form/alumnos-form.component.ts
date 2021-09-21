import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_BAKEND } from 'src/app/config/config';
import { Alumno } from 'src/app/models/alumno';
import { Archivo } from 'src/app/models/archivo';
import { Asistencia } from 'src/app/models/asistencia';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ArchivoService } from 'src/app/services/archivo.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent
  extends CommonFormComponent<Alumno, AlumnoService> implements OnInit {
  href:string
  archivos: Archivo []
  usuario: Usuario = new Usuario()
  tabIndex = 0;
  archivo: Archivo = new Archivo()
  asistencias:Asistencia[] = []
  presente:Asistencia[] = []
  archivoSelected: File
  urlBackend = URL_BAKEND
  showFile:boolean
  semestre = [
    {valor:'PRIMERO',muestraValor:'PRIMERO'},
    {valor:'SEGUNDO',muestraValor:'SEGUNDO'},
    {valor:'TERCERO',muestraValor:'TERCERO'},
    {valor:'CUARTO',muestraValor:'CUARTO'},
    {valor:'QUINTO',muestraValor:'QUINTO'},
    {valor:'SEXTO',muestraValor:'SEXTO'},
    {valor:'SEPTIMO',muestraValor:'SEPTIMO'},
    {valor:'OCTAVO',muestraValor:'OCTAVO'},
    {valor:'NOVENO',muestraValor:'NOVENO'},
    {valor:'DECIMO',muestraValor:'DECIMO'},
    {valor:'ONCEAVO',muestraValor:'ONCEAVO'},
  ];

  carrera = [
    {valor:'ISC',muestraValor:'ISC'},
    {valor:'IAD',muestraValor:'IAD'},
    {valor:'GAS',muestraValor:'GAS'},
    {valor:'LOG',muestraValor:'LOG'},
    {valor:'IDC',muestraValor:'IDC'},
  ];

  tipo = [
    {valor:'PDF',muestraValor:'PDF'},
  ];
  mostrarColumnasArchivos: string[] = ['id', 'nombre', 'comentario', 'tipo', 'archivo','editar', 'eliminar'];
  constructor(service: AlumnoService, public archivoService: ArchivoService,
    router: Router,private asistenciaService:AsistenciaService,
    route: ActivatedRoute) {

    super(service, router, route);
    this.titulo = 'Crear Alumnos';
    this.model = new Alumno();
    this.usuario = this.model.usuario
    this.redirect = `/alumnos/form/${this.model.id}`;
    this.nombreModel = Alumno.name;
    this.archivo.comentario = ""
    this.archivos = []
    this.href = `${this.urlBackend}/api/archivos/uploads/file-pdf/`
      this.showFile = false
  }

  seleccionarArchivo(event) {
    this.archivoSelected = event.target.files[0]
    //console.log(this.archivoSelected)
  }

  subirArchivo() {
    if (!this.archivoSelected) {
      Swal.fire('Error Upload: ', 'Debe seleccionar un archivo', 'error');
    } else {
     /* console.log('Imprimiendo alumno, usuario y archivo')
      console.log(this.model)
      console.log(this.usuario)
      console.log(this.archivo)
      console.log(this.archivoSelected)
     */
      this.service.crearConArchivo(this.archivo, this.archivoSelected, this.model.id)
        .subscribe(a => {
          this.archivo = a
          //console.log(a)
          this.router.navigate([this.redirect]);
          this.tabIndex = 0
          this.archivo = new Archivo()
          Swal.fire('Upload File','El archivo se subio correctamente', `success`)
        },err => {
          if(err.status == 400 || err.status == 405 ){
            this.error = err.error;
            console.log(this.error);
          }
        });
    }
  }

  

  public eliminarArchivo(archivo:Archivo): void{

    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar este archivo?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.archivoService.eliminar(archivo.id).subscribe(() => {
         // this.listar = this.listar.filter(a => a !== e);
         Swal.fire('Eliminado:', `Archivo eliminado con éxito`, 'success');
         this.router.navigate([this.redirect]);
         this.tabIndex = 0;
         this.archivos = null
        },err => {
          if(err.status === 400){
            this.error = err.error;
            console.log(this.error);
          }
        });
      }
    });
  
  }

  mostrarArchivos() {
    this.usuario = this.model.usuario
    //console.log(this.usuario)
    this.showFile = true
    this.service.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => {
      this.archivos = au
      this.showFile = false
    },err =>{
      if(err.status > 0)
      this.showFile = false
    })
  }

}

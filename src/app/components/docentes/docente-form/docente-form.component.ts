import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_BAKEND } from 'src/app/config/config';
import { Archivo } from 'src/app/models/archivo';
import { Docente } from 'src/app/models/docente';
import { Usuario } from 'src/app/models/usuario';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.css']
})
export class DocenteFormComponent
  extends CommonFormComponent<Docente, DocenteService> implements OnInit {
  urlBackend = URL_BAKEND
  archivos: Archivo[]
  usuario: Usuario = new Usuario()
  archivo: Archivo = new Archivo()
  archivoSelected: File
  showFile: boolean
  tabIndex = 0;

  division = [
    { valor: 'ISC', muestraValor: 'ISC' },
    { valor: 'IAD', muestraValor: 'IAD' },
    { valor: 'GAS', muestraValor: 'GAS' },
    { valor: 'LOG', muestraValor: 'LOG' },
    { valor: 'IDC', muestraValor: 'IDC' },
  ];

  mostrarColumnasArchivos: string[] = ['nombre', 'comentario', 'tipo', 'archivo', 'eliminar'];
  constructor(service: DocenteService, private usuarioService: UsuarioService,
    router: Router, @Inject(PLATFORM_ID) private platformId,
    route: ActivatedRoute) {
    super(service, router, route);
    this.titulo = 'Docentes';
    this.model = new Docente();
    this.usuario = this.model.usuario
    this.redirect = '/docentes';
    this.archivos = []
    this.nombreModel = Docente.name;
    this.showFile = false
  }

  mostrarArchivos() {
    this.usuario = this.model.usuario
    this.showFile = true
    //console.log(this.usuario)
    this.service.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => { // au = archivo-usuario
      //console.log(au.id<0)
      this.archivos = au
      this.showFile = false
    }, err => {
      if (err.status > 0) {
        this.showFile = false
      }
    })
  }

  redireccion(archivo: Archivo) {
    //console.log('redireccion')
    //console.log(archivo)
    if (isPlatformBrowser(this.platformId)) {
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

}

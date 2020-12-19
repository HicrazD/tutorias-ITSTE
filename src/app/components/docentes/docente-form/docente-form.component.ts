import { Component, OnInit } from '@angular/core';
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
  archivos: Archivo
  usuario: Usuario = new Usuario()
  archivo: Archivo = new Archivo()
  archivoSelected: File

  tabIndex = 0;

  division = [
    {valor:'ISC',muestraValor:'ISC'},
    {valor:'IAD',muestraValor:'IAD'},
    {valor:'GAS',muestraValor:'GAS'},
    {valor:'LOG',muestraValor:'LOG'},
    {valor:'IDC',muestraValor:'IDC'},
  ];

  mostrarColumnasArchivos: string[] = ['nombre', 'comentario', 'tipo', 'archivo', 'eliminar'];
  constructor(service: DocenteService, private usuarioService: UsuarioService,
    router: Router,
    route: ActivatedRoute) {

    super(service, router, route);
    this.titulo = 'Docentes';
    this.model = new Docente();
    this.usuario = this.model.usuario
    this.redirect = '/docentes';
    this.nombreModel = Docente.name;

  }

  mostrarArchivos() {
    this.usuario = this.model.usuario
    console.log(this.usuario)
    this.service.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => { // au = archivo-usuario
      //console.log(au.id<0)
      this.archivos = au
    })
  }

  redireccion(archivo: Archivo) {
    //console.log('redireccion')
    //console.log(archivo)
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

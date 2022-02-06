import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { URL_BAKEND } from 'src/app/config/config';
import { Archivo } from 'src/app/models/archivo';
import { ArchivoService } from 'src/app/services/archivo.service';
import { CommonListarComponent } from '../../alumnos/common-listar.component';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent
  extends CommonListarComponent<Archivo, ArchivoService> implements OnInit {
  urlBackend = URL_BAKEND
  mostrarColumnasArchivos: string[] = ['id', 'nombre', 'comentario', 'tipo', 'archivo', 'editar', 'eliminar'];

  constructor(service: ArchivoService, router: Router, @Inject(PLATFORM_ID) private platformId) {
    super(service, router)
    this.titulo = "Listado de Archivos"
    this.nombreModel = Archivo.name;

  }

  redireccion(archivo: Archivo) {
    //console.log('redireccion')
    //console.log(archivo)
    if (isPlatformBrowser(this.platformId)) {
      if (archivo.tipo === 'PDF' || archivo.tipo === 'PDF FORMATO') {
        window.open(`${this.urlBackend}/api/archivos/uploads/file-pdf/${archivo.id}`, "_blank")
      }

      if (archivo.tipo === 'WORD' || archivo.tipo === 'WORD FORMATO') {
        window.open(`${this.urlBackend}/api/archivos/uploads/file-word/${archivo.id}`, "_blank")
      }

      if (archivo.tipo === 'EXCEL' || archivo.tipo === 'EXCEL FORMATO') {
        window.open(`${this.urlBackend}/api/archivos/uploads/file-excel/${archivo.id}`, "_blank")
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo';
import { ArchivoService } from 'src/app/services/archivo.service';
import { CommonListarComponent } from '../../alumnos/common-listar.component';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent
extends CommonListarComponent<Archivo,ArchivoService> implements OnInit {

  mostrarColumnasArchivos: string[] = ['id', 'nombre', 'comentario', 'tipo', 'archivo','editar','eliminar'];

  constructor(service:ArchivoService,router: Router) { 
    super(service,router)
    this.titulo="Listado de Archivos"
    this.nombreModel = Archivo.name;
  }

  redireccion(archivo: Archivo) {
    console.log('redireccion')
    console.log(archivo)
    if (archivo.tipo === 'PDF' || archivo.tipo === 'PDF FORMATO') {
      window.open(`http://localhost:8080/api/archivos/uploads/file-pdf/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'WORD' || archivo.tipo === 'WORD FORMATO') {
      window.open(`http://localhost:8080/api/archivos/uploads/file-word/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'EXCEL' || archivo.tipo === 'EXCEL FORMATO') {
      window.open(`http://localhost:8080/api/archivos/uploads/file-excel/${archivo.id}`, "_blank")
    }
  }

}

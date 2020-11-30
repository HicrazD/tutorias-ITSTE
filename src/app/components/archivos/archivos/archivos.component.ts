import { Component, OnInit } from '@angular/core';
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

  constructor(service:ArchivoService) { 
    super(service)
    this.titulo="Listado de Archivos"
    this.nombreModel = Archivo.name;
  }

}

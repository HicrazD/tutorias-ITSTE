import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from 'src/app/services/docente.service';
import { CommonListarComponent } from '../alumnos/common-listar.component';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent 
extends CommonListarComponent<Docente,DocenteService> implements OnInit {  

  mostrarColumnasDocentes: string[] = ['id', 'nombre', 'apellido', 'correo', 'division','asignar','edit','eliminar'];

  constructor(service:DocenteService) { 
    super(service)
    this.titulo="Listado de docentes"
    this.nombreModel = Docente.name;
  }  

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from 'src/app/services/docente.service';
import { CommonListarComponent } from '../alumnos/common-listar.component';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {  // extends CommonListarComponent<Docente,DocenteService> 
  titulo: string = "Listado de Docentes"
  listar:Docente[] = []
  dataSource: MatTableDataSource<Docente>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [4, 5, 10, 20, 50];
  mostrarColumnasDocentes: string[] = ['id', 'nombre', 'apellido', 'correo', 'division','examenes','asignar','edit','eliminar'];
  constructor(private service:DocenteService) {  } 

  ngOnInit(){
    this.service.listar().subscribe(docente => {
      this.listar = docente
      this.iniciarPaginador();
    })
  }

  iniciarPaginador(): void{
    this.dataSource = new MatTableDataSource<Docente>(this.listar);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

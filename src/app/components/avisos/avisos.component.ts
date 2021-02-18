import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Aviso } from 'src/app/models/aviso';
import { AvisoService } from 'src/app/services/aviso.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
  avisos:Aviso[]

  dataSource: MatTableDataSource<Aviso>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeOptions: number[] = [4, 5, 10, 20, 50];
  mostrarColumnas: string[] = ['fecha', 'tema', 'aviso', 'editar', 'eliminar'];
  
  constructor(private service:AvisoService) {
    this.avisos = []
   }

  ngOnInit():void{
    this.service.listar().subscribe(avisos => {
      this.avisos = avisos
      this.dataSource = new MatTableDataSource<Aviso>(this.avisos);
      this.iniciarPaginador()
    })
  }

  iniciarPaginador(): void{    
    this.dataSource.paginator = this.paginator;
  }

 ordenar() {    
    this.dataSource.sort = this.sort;
    this.iniciarPaginador()
  }

}

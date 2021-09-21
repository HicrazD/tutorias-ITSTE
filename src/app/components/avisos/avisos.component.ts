import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Aviso } from 'src/app/models/aviso';
import { AuthService } from 'src/app/services/auth.service';
import { AvisoService } from 'src/app/services/aviso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {
  avisos: Aviso[]
  error: any
  dataSource: MatTableDataSource<Aviso>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeOptions: number[] = [4, 5, 10, 20, 50];
  mostrarColumnas: string[] = ['fecha', 'tema', 'aviso', 'editar', 'eliminar'];

  constructor(private service: AvisoService, public authService: AuthService) {
    this.avisos = []
  }

  ngOnInit(): void {
    this.listAvisos()
  }

  listAvisos(): void {
    this.service.listar().subscribe(avisos => {
      this.avisos = avisos
      this.dataSource = new MatTableDataSource<Aviso>(this.avisos);
      this.iniciarPaginador()
    })
  }

  iniciarPaginador(): void {
    this.dataSource.paginator = this.paginator;
  }

  ordenar() {
    this.dataSource.sort = this.sort;
    this.iniciarPaginador()
  }

  public eliminar(id: number): void {

    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value && this.isAuth()) {

        this.service.eliminar(id).subscribe(() => {
          // this.listar = this.listar.filter(a => a !== e);
          this.listAvisos()
          Swal.fire('Eliminado:', `Aviso eliminado con éxito`, 'success');
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
      }
    });

  }

  isAuth(): boolean {
    if (this.authService.hasRole('ROLE_ADMIN')) return true
    else return false
  }
}

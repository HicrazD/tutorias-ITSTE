import { Directive, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Generic } from 'src/app/models/generic';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
@Directive()
export abstract class CommonListarComponent<E extends Generic,S extends CommonService<E>> implements OnInit {
  titulo:string;
  listar: E[]
  protected nombreModel: string;
  error: any;
  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(protected service:S) { }

  ngOnInit(){
    this.calcularRangos();
 }

 paginar(event: PageEvent): void {
  this.paginaActual = event.pageIndex;
  this.totalPorPagina = event.pageSize;
  this.calcularRangos();
}

 private calcularRangos(){
  this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString())
  .subscribe(p => 
    {
      this.listar = p.content as E[];
      this.totalRegistros = p.totalElements as number;
    });
}

 public eliminar(e: E): void{

  Swal.fire({
    title: 'Cuidado:',
    text: `¿Seguro que desea eliminar?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
    if (result.value) {
      this.service.eliminar(e.id).subscribe(() => {
       // this.listar = this.listar.filter(a => a !== e);
       this.calcularRangos();
       Swal.fire('Eliminado:', `${this.nombreModel} eliminado con éxito`, 'success');
      },err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  });

}
}
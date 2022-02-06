import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from 'src/app/services/docente.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {  // extends CommonListarComponent<Docente,DocenteService> 
  titulo: string = "Docentes"
  listar: Docente[] = []
  error: any
  loading: boolean
  dataSource: MatTableDataSource<Docente>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [4, 5, 10, 20, 50];
  mostrarColumnasDocentes: string[] = ['id', 'nombre', 'apellido', 'correo', 'division', 'examenes', 'asignar', 'edit', 'eliminar'];
  constructor(private service: DocenteService, @Inject(PLATFORM_ID) private platformId) {
    this.loading = true
  }

  ngOnInit() {
    this.listDocente()
  }

  listDocente(): void {
    this.service.listar().subscribe(docente => {
      this.loading = false
      this.listar = docente
      this.iniciarPaginador();
    }, err => {
      if (err.name === 'HttpErrorResponse')
        this.error = err.error
    })
  }

  iniciarPaginador(): void {
    this.dataSource = new MatTableDataSource<Docente>(this.listar);
    this.dataSource.paginator = this.paginator;
    this.loading = false
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public eliminar(docente: Docente): void {

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
        this.service.eliminar(docente.id).subscribe(() => {
          // this.listar = this.listar.filter(a => a !== e);
          this.loading = true
          this.listDocente()
          Swal.fire('Eliminado:', `Docente eliminado con éxito`, 'success');
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            //  console.log(this.error);
          }
        });
      }
    });

  }

  exportexcel(): void {
    if (isPlatformBrowser(this.platformId)) {
      let element = document.getElementById('docentesTable');
      //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element.d)
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'data': worksheet },
        SheetNames: ['data']
      }
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(data, 'Docentes_Tabla' + '_export_' + '.xlsx')
    }
  }

}

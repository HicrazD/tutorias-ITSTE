import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Resultado } from 'src/app/models/resultado';
import { ResultadoService } from 'src/app/services/resultado.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExamenService } from 'src/app/services/examen.service';
import { Examen } from 'src/app/models/examen';


@Component({
  selector: 'app-resultados-evaluacion',
  templateUrl: './resultados-evaluacion.component.html',
  styleUrls: ['./resultados-evaluacion.component.css']
})

export class ResultadosEvaluacionComponent {
  dataSource: MatTableDataSource<Resultado>;
  resultados:Resultado[]
  displayedColumns: string[] = ['nombre', 'apellido', 'division', 'resultado'];  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  evaluacion:Examen
  error:any
  titulo:string
  constructor(private service:ResultadoService,protected router: Router,
    protected route: ActivatedRoute, private serviceEvaluacion:ExamenService) {
    this.resultados = []   
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.service.findByEvaluacionId(id).subscribe(resultados => {
          this.resultados = resultados
        // console.log(this.resultados)
          this.titulo = 'Resultados';
          this.dataSource = new MatTableDataSource(this.resultados);
        });

        this.serviceEvaluacion.ver(id).subscribe(evaluacion => 
          {
            this.evaluacion = evaluacion
          },err =>{
             this.error = err.error
          }
          )
      }
    })    
  }

  sortResults() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportexcel(): void {
    let element = document.getElementById('resultadosTable');
 //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element.d)
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    FileSaver.saveAs(data,  'Resultados_evaluacion'+ `_${this.evaluacion.nombre}_` + '_export_' + '.xlsx')
  }
}

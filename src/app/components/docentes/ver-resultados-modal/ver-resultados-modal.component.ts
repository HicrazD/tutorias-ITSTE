import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Docente } from 'src/app/models/docente';
import { Examen } from 'src/app/models/examen';
import { Resultado } from 'src/app/models/resultado';
import { ResultadoService } from 'src/app/services/resultado.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as html2pdf from 'html2pdf.js'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ver-resultados-modal',
  templateUrl: './ver-resultados-modal.component.html',
  styleUrls: ['./ver-resultados-modal.component.css']
})
export class VerResultadosModalComponent implements OnInit {
  
  docente: Docente;
  examen: Examen;
  suma:number = 0
  mostrarSuma:number = 0
  resultados:Resultado[] = []
  mostrarColumnas: string[] = ['id', 'resultado'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,@Inject(PLATFORM_ID) private platformId,
  public modalRef: MatDialogRef<VerResultadosModalComponent>,
  private service:ResultadoService) { }

  ngOnInit(): void {
    this.docente = this.data.docente ;
    this.examen = this.data.examen ;
    this.resultados = this.data.resultados 
    //console.log(this.resultados)
   // this.resultadoFinal(this.resultados,0)
  }
  getTotalCost() { // Obtenemos una lista de la columna resultados
                   // con reduce podemos iterar esa lista y poder hacer una sumatoria de la lista optenida
                  // mas informacino buscar MapReduce js o ts
    return (this.resultados.map(r => r.resultado).reduce((acc, value) => acc + value, 0))/this.resultados.length;
  }
  /*
  resultadoFinal(resultados:Resultado[],i:number){
    let rs = resultados.map(resultados => resultados.resultado)
    
    if(i < resultados.length){
      this.suma += rs[i]
console.log(this.suma)
      this.resultadoFinal(resultados,i+1)
    }
    else{
      console.log(this.suma)
      this.mostrarSuma = this.suma / resultados.length
      this.suma = 0
    }
  }*/

  exportexcel(): void {
    if (isPlatformBrowser(this.platformId))
    {let element = document.getElementById('resultadosTable');
 //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element.d)
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    FileSaver.saveAs(data, this.docente.nombre+'_Resultados' + '_export_' + '.xlsx')}
  }

  exportPdf(){
    if (isPlatformBrowser(this.platformId)){
    let element = document.getElementById('element-to-print');
    const opt = {
      margin:       0.4,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();}
  }

  cerrar(): void {
    this.modalRef.close();
  }

}

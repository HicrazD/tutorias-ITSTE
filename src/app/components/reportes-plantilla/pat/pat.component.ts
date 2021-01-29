import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Docente } from 'src/app/models/docente';
import { Sesion } from 'src/app/models/sesion';
import * as html2pdf from 'html2pdf.js'
import { Asistencia } from 'src/app/models/asistencia';
@Component({
  selector: 'app-pat',
  templateUrl: './pat.component.html',
  styleUrls: ['./pat.component.css']
})
export class PatComponent implements OnInit {

  docente: Docente;
  sesiones: Sesion[]
  bloque1:Sesion[] = []
  bloque2:Sesion[] = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any)
  {
  }

  ngOnInit(): void {
    this.docente = this.data.docente as Docente
    this.sesiones = this.data.sesiones as Sesion[]
    this.bloque1 = this.sesiones.filter(s => s.numSesion < 8)
    this.bloque2 = this.sesiones.filter(s => s.numSesion >= 8)
    console.log(this.bloque1)
    console.log(this.bloque2)
  }

  exportPdf(){
    let element = document.getElementById('element-to-print');
    const opt = {
      margin:       0,
      filename:     `Pat_${this.docente.nombre}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'cm', format: 'letter', orientation: 'l',compress:'true' }
    };
    html2pdf().from(element).set(opt).save();
  }

}

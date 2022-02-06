import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';
import * as html2pdf from 'html2pdf.js'
import { Docente } from 'src/app/models/docente';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-hoja-canalizacion',
  templateUrl: './hoja-canalizacion.component.html',
  styleUrls: ['./hoja-canalizacion.component.css']
})
export class HojaCanalizacionComponent implements OnInit {
  alumno:Alumno
  docente:Docente
  nombreDocente:string
  semestreGrupo:string=""
  periodoS:string=""
  division:string=""
  NombreTutorado:string=""
  n = 1
  n2 = 0
  elements = Array(this.n)
  elements2 = Array(this.n2)
  agregarPage:boolean = false
  constructor( public modalRef: MatDialogRef<HojaCanalizacionComponent>,
    @Inject(PLATFORM_ID) private platformId,
     @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.alumno = data.a as Alumno
    this.docente = data.docente as Docente
    this.nombreDocente = this.docente.nombre + this.docente.apellido
  }

  ngOnInit(): void {
    //console.log(this.n)
    this.semestreGrupo = this.alumno.semestre + " ".concat(this.alumno.grupo)
    this.periodoS = this.alumno.periodoSemestral
    this.division = "ISC"
    this.NombreTutorado = this.alumno.nombre + " ".concat(this.alumno.apellido)
  }
  btnAdd():void{
    if(this.n < 2 && this.n2 == 0){
       this.n += 1
       this.elements = Array(this.n)
    }
    this.cantidadN()
  }
  btnDel(){
    if(this.n2 == 0 && this.n > 0){
      this.n -= 1
      this.elements = Array(this.n)
    }
    this.cantidadN()
  }

  btnAdd2():void{
    if(this.n == 2 && this.n2 < 3){
      this.n2 +=1
      this.elements2 = Array(this.n2)
    }
    this.cantidadN()
  }
  btnDel2(){
    if(this.n2 > 0 && this.n == 2){
      this.n2 -= 1
      this.elements2 = Array(this.n2)
    }
    this.cantidadN()
  }
  pagina(){
    if(this.agregarPage) this.agregarPage = false;else this.agregarPage = true
  }
  cantidadN(){
     /* console.log("n1")
      console.log(this.n)
      console.log("n2")
      console.log(this.n2)*/
  }
  exportPdf(){
    if (isPlatformBrowser(this.platformId))
    {let element = document.getElementById('element-to-print');
    const opt = {
      margin:       0.0,
      filename:     `Hoja_canalizacion_${this.alumno.nombre}_.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'cm', format: 'letter', orientation: 'l',compress:'true' }
    };
    html2pdf().from(element).set(opt).save();}
  }

}

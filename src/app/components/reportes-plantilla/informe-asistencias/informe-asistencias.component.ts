import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as html2pdf from 'html2pdf.js'
import {MatSort} from '@angular/material/sort';
import { Docente } from 'src/app/models/docente';
import { Alumno } from 'src/app/models/alumno';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-informe-asistencias',
  templateUrl: './informe-asistencias.component.html',
  styleUrls: ['./informe-asistencias.component.css']
})

export class InformeAsistenciasComponent implements OnInit {
  line1:string = "LIC. ANA LAURA ORTIZ GALINDO"
  line2:string = "JEFA DEL DEPARTAMENTO  DESARROLLO ACADÉMICO"
  line3:string
  docente: Docente;
  alumnos: Alumno[] = []
  bloque1:Alumno[] = []
  bloque2:Alumno[] = []

  txtArea:String = "Por este medio, me dirijo a usted para hacer de su conocimiento el porcentaje de asistencia de mis tutorados, obtenido del semestre Enero-Junio 2020, para considerar aquellos que alcanzaron el 80%, son quienes tienen derecho a recibir su constancia de cumplimiento de tutorías y a participar en el proceso de evaluación tutorial"
  @ViewChild(MatSort) sort: MatSort;

  constructor(  public modalRef: MatDialogRef<InformeAsistenciasComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  public asistenciaService:AsistenciaService)
   {
     this.docente = data.docente as Docente
     }
  
  ngOnInit(){
    this.alumnos = this.docente.alumnos
    this.alumnos = this.alumnos.map(alumno => 
     {
      this.asistenciaService.encontrarAsistenciaPorAlumno(alumno).subscribe(asistencias => 
        {          
          alumno.asistenciaPresente = asistencias.filter(asistencia => asistencia.statusAsistencia).length
        } 
      )
      return alumno
     })
     console.log(this.alumnos)
   // console.log(this.alumnos)
  }


exportPdf(){
  let element = document.getElementById('element-to-print');
  const opt = {
    margin:       0.0,
    filename:     `Informe_asistencias_${this.docente.nombre}_.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'cm', format: 'letter', orientation: 'p',compress:'true' }
  };
  html2pdf().from(element).set(opt).save();
}
}

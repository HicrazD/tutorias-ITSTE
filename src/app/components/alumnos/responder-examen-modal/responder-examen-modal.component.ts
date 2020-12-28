import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';
import { Docente } from 'src/app/models/docente';
import { Examen } from 'src/app/models/examen';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-responder-examen-modal',
  templateUrl: './responder-examen-modal.component.html',
  styleUrls: ['./responder-examen-modal.component.css']
})
export class ResponderExamenModalComponent implements OnInit {

  docente: Docente;
  alumno: Alumno;
  examen: Examen;

  respuestas: Map<number, Respuesta> = new Map<number, Respuesta>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<ResponderExamenModalComponent>) { }

  ngOnInit(): void {
    this.docente = this.data.docente as Docente;
    this.alumno = this.data.alumno as Alumno;
    this.examen = this.data.examen as Examen;
  }

  cancelar(): void{
    this.modalRef.close();
  }
  
  responder(pregunta: Pregunta, event): void { // Cambiar texto para utilisar datos numericos
    const numero = event.target.value as number;
    const respuesta  = new Respuesta();
    respuesta.alumno = this.alumno;
    respuesta.pregunta = pregunta;

    const examen = new Examen();
    examen.id = this.examen.id;
    examen.nombre = this.examen.nombre;

    respuesta.pregunta.examen = examen;
    respuesta.numero = numero;

    this.respuestas.set(pregunta.id, respuesta);
    console.log(this.respuestas);
  }

}


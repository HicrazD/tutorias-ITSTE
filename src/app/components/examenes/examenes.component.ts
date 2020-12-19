import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import {CommonListarComponent } from 'src/app/components/alumnos/common-listar.component'
import { Router } from '@angular/router';
@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent 
extends CommonListarComponent<Examen, ExamenService> implements OnInit{

  constructor(service: ExamenService,router: Router) {
    super(service,router);
    this.titulo = 'Listado de exámenes';
    this.nombreModel = Examen.name;
   }

   disabledButton(examen:Examen){
     this.service.activarExamen(examen).subscribe(()=>{
      this.service.listar().subscribe(examenes => {this.listar = examenes})
     },err=>{
        this.error = err
        if(this.error.status == 500){
          console.log('problema en el servidor')
        }
     })    
     
   }

}

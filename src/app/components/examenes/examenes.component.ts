import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import {CommonListarComponent } from 'src/app/components/alumnos/common-listar.component'
import { Router } from '@angular/router';
import { ResultadoService } from 'src/app/services/resultado.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent 
extends CommonListarComponent<Examen, ExamenService> implements OnInit{

  constructor(service: ExamenService,router: Router,public resultadoService:ResultadoService,
    public respuestaService:RespuestaService) {
    super(service,router);
    this.titulo = 'Evaluaciones';
    this.nombreModel = 'Evaluacion';
   }

   eliminarEvaluacion(e:Examen){
     this.service.eliminarEvaluacion(e.id).subscribe(()=>{
       this.eliminar(e)
     })
   }

   disabledButton(examen:Examen){
     this.service.activarExamen(examen).subscribe(()=>{
      this.service.listar().subscribe(examenes => {this.listar = examenes})
     },err=>{
        this.error = err
        if(this.error.status == 500){
        //  console.log('problema en el servidor')
        }
     })    
     
   }
   eliminarResultadosYRespuestas(){
    Swal.fire({
      title: 'Cuidado:',
      text: `Al hacer esto los resultados y respuestas en la base de datos se reiniciaran, esto ayuda a que se pueda utilizar de nuevo la evaluacion`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.respuestaService.eliminarAllRespuestas().subscribe(() => {
          Swal.fire('Eliminadar:', `Eliminacion completa`, 'success');
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            //  console.log(this.error);
          }
          if ( err.status == 500) {
            this.error = err.error;
            Swal.fire('Error:', `No se pudo conectar con el servidor`, 'warning');
            //  console.log(this.error);
          }
        })
        this.resultadoService.eliminarAllResultados().subscribe(() => {
          Swal.fire('Eliminadar:', `Eliminacion completa`, 'success');
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
                        //  console.log(this.error);
          }
          if ( err.status == 500) {
            this.error = err.error;
            Swal.fire('Error:', `No se pudo conectar con el servidor`, 'warning');
            //  console.log(this.error);
          }
        })
      }
    });
     
   }

}

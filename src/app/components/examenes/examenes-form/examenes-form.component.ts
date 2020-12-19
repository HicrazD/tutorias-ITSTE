import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { Pregunta } from 'src/app/models/pregunta';
import { ExamenService } from 'src/app/services/examen.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-examenes-form',
  templateUrl: './examenes-form.component.html',
  styleUrls: ['./examenes-form.component.css']
})
export class ExamenesFormComponent 
extends CommonFormComponent<Examen, ExamenService> implements OnInit {


  errorPreguntas: string;

  constructor(service: ExamenService,
    router: Router,
    route: ActivatedRoute) {
      super(service, router, route);
      this.titulo = 'Crear Examen';
      this.model = new Examen();
      this.nombreModel = Examen.name;
      this.redirect = '/examenes';

     }

     ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const id: number = +params.get('id');
        if(id){
          this.service.ver(id).subscribe(m => {
            this.model = m;
            this.titulo = 'Editar ' + this.nombreModel;
          });
        }
      });


    }

    public crear(): void {
      if(this.model.preguntas.length === 0){
        this.errorPreguntas = 'Examen debe tener preguntas';
        //Swal.fire('Error Preguntas', 'Examen debe tener preguntas', 'error');
        return;
      }
      this.errorPreguntas = undefined;
      this.eliminarPreguntasVacias();
      super.crear();
    }

    public editar(): void {
      if(this.model.preguntas.length === 0){
        this.errorPreguntas = 'Examen debe tener preguntas';
        //Swal.fire('Error Preguntas', 'Examen debe tener preguntas', 'error');
        return;
      }
      this.errorPreguntas = undefined;
      this.eliminarPreguntasVacias();
      super.editar();
    }

    agregarPregunta(): void {
      this.model.preguntas.push(new Pregunta());
    }

    asignarTexto(pregunta: Pregunta, event: any):void {
      pregunta.texto = event.target.value as string;
     // console.log(this.model);
    }

    eliminarPregunta(pregunta):void{
      this.model.preguntas = this.model.preguntas.filter(p => pregunta.texto !== p.texto);
    }

    eliminarPreguntasVacias(): void{
      this.model.preguntas = this.model.preguntas.filter(p => p.texto !=null && p.texto.length > 0);
    }

}
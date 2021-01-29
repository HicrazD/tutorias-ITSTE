import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Sesion } from 'src/app/models/sesion';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-asistencias-model',
  templateUrl: './asistencias-model.component.html',
  styleUrls: ['./asistencias-model.component.css']
})
export class AsistenciasModelComponent implements OnInit {
  error:any
  sesion:Sesion
  asistencias:Asistencia[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service:AsistenciaService,
  private sesionService:SesionService)
  {}

  ngOnInit(): void {
    this.sesion = this.data.sesion as Sesion
    this.verSesion()
    }

  modificarEstado(asistencia:Asistencia){
     this.service.editar(asistencia).subscribe(()=>{this.verSesion()},
     err =>{
       this.error = err.error
       console.log(this.error)
     })
  }

  verSesion(){
    this.sesionService.ver(this.sesion.id).subscribe(sesion => {
      this.sesion = sesion
      this.asistencias = this.sesion.asistencias
     // console.log(this.sesion)
    })
  }
}

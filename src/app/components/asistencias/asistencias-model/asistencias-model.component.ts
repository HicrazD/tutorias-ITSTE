import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';
import { Asistencia } from 'src/app/models/asistencia';
import { Sesion } from 'src/app/models/sesion';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { SesionService } from 'src/app/services/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencias-model',
  templateUrl: './asistencias-model.component.html',
  styleUrls: ['./asistencias-model.component.css']
})
export class AsistenciasModelComponent implements OnInit {
  error:any
  presente: Asistencia[]
  alumnosAsistencias:Asistencia[]
  sesion:Sesion
  asistencias:Asistencia[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service:AsistenciaService,
  private sesionService:SesionService,private asistenciaService: AsistenciaService,private alumnoService: AlumnoService)
  {}

  ngOnInit(): void {
    this.sesion = this.data.sesion as Sesion
    this.verSesion()
    }

  modificarEstado(asistencia:Asistencia){
     this.service.editar(asistencia).subscribe(a=>{
       this.asistenciasAlumno(a.alumno)       
      },
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
  asistenciasAlumno(alumno:Alumno) {
    this.asistenciaService.encontrarAsistenciaPorAlumno(alumno).subscribe(asistencias => {

      this.alumnosAsistencias = asistencias
      this.presente = asistencias.filter(a => a.statusAsistencia)
     // console.log('presente {' + this.presente.length + '}')
     // console.log('asistencias {' + this.asistencias.length + '}')
      alumno.promAsistencia = (this.presente.length * 100)/( this.alumnosAsistencias.length)

      this.alumnoService.editar(alumno).subscribe(alumno =>{
        this.verSesion()
        Swal.fire('Exito¡',`Asistencia modificada `,'success')
      },err =>{
        this.error = err.error
        console.log(this.error)
        if(err.status == 400){
          Swal.fire('Uups','No se pudo modificar la sistencia','error')
        }
      })
    })
  }
}

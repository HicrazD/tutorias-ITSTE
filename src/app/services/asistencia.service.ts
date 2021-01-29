import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Alumno } from '../models/alumno';
import { Asistencia } from '../models/asistencia';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService extends CommonService<Asistencia>{

  protected baseEndpoint = URL_BAKEND + '/api/asistencias'
  constructor(protected http:HttpClient){
    super(http)
  }

  public encontrarAsistenciaPorAlumno(alumno:Alumno):Observable<Asistencia[]>{
    return this.http.get<Asistencia[]>(`${this.baseEndpoint}/filtrar/asistencias-alumno/${alumno.id}`)
  }
}

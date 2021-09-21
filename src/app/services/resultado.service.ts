import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Alumno } from '../models/alumno';
import { Docente } from '../models/docente';
import { Examen } from '../models/examen';
import { Resultado } from '../models/resultado';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService extends CommonService<Resultado>{

  protected baseEndpoint = URL_BAKEND + '/api/resultados'
  constructor(protected http:HttpClient){
    super(http)
  }

  public findByResultadoAttribIds(docente:Docente,alumno:Alumno,examen:Examen): Observable<Resultado>{
    return this.http.get<Resultado>(`${this.baseEndpoint}/resultados/buscar-por-ids/docente/${docente.id}/alumno/${alumno.id}/examen/${examen.id}`);
  }
  public findByResultadoByDocente(docente:Docente,examen:Examen): Observable<Resultado[]>{
    return this.http.get<Resultado[]>(`${this.baseEndpoint}/buscar-por-ids/docente/${docente.id}/examen/${examen.id}`);
  }

  public findByEvaluacionId(id:number): Observable<Resultado[]>{
    return this.http.get<Resultado[]>(`${this.baseEndpoint}/evaluacion/${id}`);
  }

  buscarResultadoIdsPorAlumnoId(id:number):Observable<number[]>{
    return this.http.get<number[]>(`${this.baseEndpoint}/buscar-resultadoIds/alumnoId/${id}`)
  }

  eliminarResultadoIdsPorAlumnoId(ids:number[]):Observable<number[]>{
    return this.http.put<number[]>(`${this.baseEndpoint}/eliminar-resultadoIds`,ids,{headers: this.cabecera})
  }

  eliminarAllResultados():Observable<Resultado[]>{
    return this.http.delete<Resultado[]>(`${this.baseEndpoint}/eliminar-todo`)
  }


}

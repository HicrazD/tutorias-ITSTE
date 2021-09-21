import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Alumno } from '../models/alumno';
import { Examen } from '../models/examen';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private cabeceras: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  private baseEndpoint = URL_BAKEND + '/api/respuestas';

  constructor(private http: HttpClient) { }

  crear(respuestas: Respuesta[]): Observable<Respuesta[]>{
    return this.http.post<Respuesta[]>(this.baseEndpoint, respuestas, {headers: this.cabeceras});
  }

  obtenerRespuestasPorAlumnoPorExamen(alumno: Alumno, examen: Examen): Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(`${this.baseEndpoint}/alumno/${alumno.id}/examen/${examen.id}`);
  }

  obtenerRespuestasPorAlumno(id:number): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseEndpoint}/obtener-respuestas/alumno/${id}`)
  }

  eliminarRespuestasPorAlumno(ids:number[]):Observable<number[]>{
    return this.http.put<number[]>(`${this.baseEndpoint}/eliminar-respuestas`,ids, {headers: this.cabeceras})
  }

  eliminarAllRespuestas():Observable<Respuesta[]>{
    return this.http.delete<Respuesta[]>(`${this.baseEndpoint}/eliminar-todo`)
  }

}

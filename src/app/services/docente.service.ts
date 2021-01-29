import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Alumno } from '../models/alumno';
import { Archivo } from '../models/archivo';
import { Docente } from '../models/docente';
import { Examen } from '../models/examen';
import { Sesion } from '../models/sesion';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DocenteService extends CommonService<Docente>{
  protected baseEndpoint = URL_BAKEND + '/api/docentes'
  constructor(protected http:HttpClient){
    super(http)
  }

  public obtenerCursoPorAlumnoId(alumno: Alumno): Observable<Docente>{
    return this.http.get<Docente>(`${this.baseEndpoint}/filtrar-docente/alumno/${alumno.id}`);
  }

  public obtenerDocentePorAlumnoId(alumno: Alumno): Observable<Docente>{
    return this.http.get<Docente>(`${this.baseEndpoint}/docente-alumno/${alumno.id}`);
  }

  asignarAlumnos(docente: Docente, alumnos: Alumno[]): Observable<Docente>{
    return this.http.put<Docente>(`${this.baseEndpoint}/${docente.id}/asignar-alumnos`,
     alumnos,
     {headers: this.cabecera});
  }

  eliminarSesion(id: number,sesion: Sesion): Observable<Docente>{
    return this.http.put<Docente>(`${this.baseEndpoint}/sesion/${id}/eliminar-sesion`,
     sesion,
     {headers: this.cabecera});
  }

  crearYAsignarSesion(docente: Docente, sesion:Sesion):Observable<Docente>{
    return this.http.put<Docente>(`${this.baseEndpoint}/crear-sesion/docente/${docente.id}`,
     sesion,
     {headers: this.cabecera});
  }

  eliminarAlumno(docente: Docente, alumno: Alumno): Observable<Docente> {
    return this.http.put<Docente>(`${this.baseEndpoint}/${docente.id}/eliminar-alumno`,
    alumno,
    {headers: this.cabecera});
  }

  public crearPorUsuarioUsername(docente:Docente,username:string):Observable<Docente>{
    return this.http.post<Docente>(`${this.baseEndpoint}/crear/docente-usuario/${username}`, docente, {headers: this.cabecera})
  }

  public filtrarPorUsuarioUsername(username: string):Observable<Docente>{
    return this.http.get<Docente>(`${this.baseEndpoint}/filtrar/docente-usuario/${username}`)
  }
  
  public filtrarArchivosByUsuarioId(id:number):Observable<Archivo>{
    return this.http.get<Archivo>(`${this.baseEndpoint}/ver-archivo/${id}`)
  }
  
  public filtrarPorDivision(division: string,term:string): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${this.baseEndpoint}/filtrar/division/${division}/nombreOrapellido/${term}`);
  }

  public crearConArchivo(a: Archivo, archivo: File,id:number): Observable<Archivo>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', a.nombre);
    formData.append('comentario', a.comentario);
    formData.append('tipo', a.tipo);
    return this.http.post<Archivo>(`${this.baseEndpoint}/${id}/crear-archivo`,formData);
  }

  asignarExamenes(docente: Docente, examenes: Examen[]): Observable<Docente>{
    return this.http.put<Docente>(`${this.baseEndpoint}/${docente.id}/asignar-examenes`,
    examenes, {headers: this.cabecera})

  }

  eliminarExamen(docente: Docente, examen: Examen):Observable<Docente>{
    return this.http.put<Docente>(`${this.baseEndpoint}/${docente.id}/eliminar-examen`,
    examen, {headers: this.cabecera})
  }

  asignarExamenesTodos(examenes: Examen[]): Observable<Docente[]>{
    return this.http.put<Docente[]>(`${this.baseEndpoint}/asignar-examenes/all`,
    examenes,{headers: this.cabecera});
  }
}

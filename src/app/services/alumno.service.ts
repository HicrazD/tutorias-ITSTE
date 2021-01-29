import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Alumno } from '../models/alumno';
import { Archivo } from '../models/archivo';
import { Docente } from '../models/docente';
import { Sesion } from '../models/sesion';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno>{
  protected baseEndpoint = URL_BAKEND + '/api/alumnos'
  constructor(protected http:HttpClient){
    super(http)
  }

  public filtrarDocentePorAombre(alumno: Alumno): Observable<Docente>{
    return this.http.get<Docente>(`${this.baseEndpoint}/filtrar-docente/alumno/${alumno.id}`);
  }

  public filtrarPorNombre(nombre: string): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }

  public filtrarPorUsuarioUsername(username: string):Observable<Alumno>{
    return this.http.get<Alumno>(`${this.baseEndpoint}/filtrar/alumno-usuario/${username}`)
  }

  public filtrarArchivosByUsuarioId(id:number):Observable<Archivo>{
    return this.http.get<Archivo>(`${this.baseEndpoint}/ver-archivo/${id}`)
  }

  public filtrarAlumnoByMatricula(matricula:number):Observable<Alumno>{
    return this.http.get<Alumno>(`${this.baseEndpoint}/matricula/${matricula}`)
  }


  public crearPorUsuarioId(alumno:Alumno,username:string):Observable<Alumno>{
    return this.http.post<Alumno>(`${this.baseEndpoint}/crear/alumno-usuario/${username}`, alumno, {headers: this.cabecera})
  }

  public crearConArchivo(a: Archivo, archivo: File,id:number): Observable<Archivo>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', a.nombre);
    formData.append('comentario', a.comentario);
    formData.append('tipo', a.tipo);
    return this.http.post<Archivo>(`${this.baseEndpoint}/${id}/crear-archivo`,formData);
  }

  crearYAsignarAsistencia(sesion:Sesion, alumnos:Alumno[]): Observable<Alumno[]>{
    return this.http.put<Alumno[]>(`${this.baseEndpoint}/crear-asistencia/sesion/${sesion.id}`,
    alumnos,
     {headers: this.cabecera});
  }
}

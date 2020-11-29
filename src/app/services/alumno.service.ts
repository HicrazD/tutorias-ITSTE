import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Archivo } from '../models/archivo';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno>{
  protected baseEndpoint = 'http://localhost:8080/api/alumnos'
  constructor(protected http:HttpClient){
    super(http)
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
}

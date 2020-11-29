import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
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


  public crearPorUsuarioId(alumno:Alumno,username:string):Observable<Alumno>{
    return this.http.post<Alumno>(`${this.baseEndpoint}/crear/alumno-usuario/${username}`, alumno, {headers: this.cabecera})
  }
}

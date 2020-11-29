import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { Docente } from '../models/docente';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DocenteService extends CommonService<Docente>{
  protected baseEndpoint = 'http://localhost:8080/api/docentes'
  constructor(protected http:HttpClient){
    super(http)
  }

  asignarAlumnos(docente: Docente, alumnos: Alumno[]): Observable<Docente>{
    return this.http.put<Docente>(`${this.baseEndpoint}/${docente.id}/asignar-alumnos`,
     alumnos,
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
}

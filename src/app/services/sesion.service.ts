import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Docente } from '../models/docente';
import { Sesion } from '../models/sesion';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService extends CommonService<Sesion>{
  protected baseEndpoint = URL_BAKEND + '/api/sesiones'
  constructor(protected http:HttpClient){
    super(http)
  }

  public encontrarSesionesPorDocente(docente:Docente):Observable<Sesion[]>{
    return this.http.get<Sesion[]>(`${this.baseEndpoint}/filtrar/sesiones/docente/${docente.id}`)
  }
}

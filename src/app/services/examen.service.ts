import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen>{

  protected baseEndpoint = URL_BAKEND + '/api/examenes';

  constructor(http: HttpClient) { 
    super(http);
  }


  public filtrarPorNombre(nombre: string): Observable<Examen[]>{
    return this.http.get<Examen[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }

  public  activarExamen(examen:Examen):Observable<Examen[]>{
    return this.http.get<Examen[]>(`${this.baseEndpoint}/activacion/status/${examen.id}`);
  }
}

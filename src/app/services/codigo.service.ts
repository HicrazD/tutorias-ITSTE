import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Codigo } from '../models/codigo';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CodigoService extends CommonService<Codigo> {
  protected baseEndpoint = URL_BAKEND + '/api/codigos'
  constructor(protected http:HttpClient){
    super(http)
  }

  public verCodigo(codigo: string): Observable<Codigo>{
    return this.http.get<Codigo>(`${this.baseEndpoint}/ver-code/${codigo}`);
  }

  public create(codigo:Codigo):Observable<Codigo>{
    return this.http.post<Codigo>(`${this.baseEndpoint}/crear`, codigo, {headers: this.cabecera})
  }
}

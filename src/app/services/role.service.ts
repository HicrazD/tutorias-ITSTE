import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Roles } from '../models/roles';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CommonService<Roles>{
  protected baseEndpoint = URL_BAKEND + '/api/roles'
  constructor(protected http:HttpClient){
    super(http)
  }
  public verRole(id: number):Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.baseEndpoint}/${id}`)
  }

  public filtrarRole(term: string):Observable<Roles>{
    return this.http.get<Roles>(`${this.baseEndpoint}/filtrar/role-nombre/${term}`)
  }

  public crearRoles():Observable<Roles>{
    return this.http.post<Roles>(`${this.baseEndpoint}/create/roles`, {headers: this.cabecera})
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../models/roles';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CommonService<Roles>{
  protected baseEndpoint = 'http://localhost:8080/api/roles'
  constructor(protected http:HttpClient){
    super(http)
  }
  public verRole(id: number):Observable<Roles[]>{
    return this.http.get<Roles[]>(`${this.baseEndpoint}/${id}`)
  }

  
}

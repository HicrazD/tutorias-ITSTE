import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { CommonService } from './common.service';
import { URL_BAKEND } from '../config/config'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CommonService<Usuario> {
  protected baseEndpoint = URL_BAKEND + '/api/usuarios'
  private _usuario:Usuario = new Usuario()
  constructor(protected http:HttpClient){
    super(http)
  }
  
  public get usuario():Usuario{
    if(this._usuario != null) return this._usuario;
    return null
  }

  guardarUsuario(usuario:Usuario):void{
    this._usuario = usuario
  }

  public createRol(usuario:Usuario,id:number):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseEndpoint}/usuario-role/${id}`,usuario, {headers: this.cabecera})
  }
  
  public UsuarioRoleDocentePaginas(page:string, size: string): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);

    return this.http.get<any>(`${this.baseEndpoint}/pagina`, {params:params})
  }
  

  public UsuarioRoleDocente():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseEndpoint}/filtrar/usuarios-role-docente`)
  }

  public UsuarioRoleAlumno():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseEndpoint}/filtrar/usuarios-role-alumno`)
  }

  public filtrarUsernambre(username: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseEndpoint}/filtrar/username/${username}`);
  }

  public sessionLogin(usuario: Usuario): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseEndpoint}/sesion-login/status/${usuario.username}`);
  }

  public sessionLogOut(usuario: Usuario): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseEndpoint}/sesion-logout/status/${usuario.username}`);
  }
}

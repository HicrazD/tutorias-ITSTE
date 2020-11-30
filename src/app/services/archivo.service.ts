import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivo } from '../models/archivo';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService extends CommonService<Archivo>{
  protected baseEndpoint = 'http://localhost:8080/api/archivos'
  constructor(protected http:HttpClient){
    super(http)
  } 

  public filtrarTipoArchivo(term: string):Observable<Archivo[]>{
    return this.http.get<Archivo[]>(`${this.baseEndpoint}/tipo/${term}`)
  }

  public crearConArchivo(a: Archivo, archivo: File): Observable<HttpEvent<{}>>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', a.nombre);
    formData.append('comentario', a.comentario);
    formData.append('tipo', a.tipo);
    const req = new HttpRequest('POST',`${this.baseEndpoint}/crear-archivo`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
    //return this.http.post<Archivo>(`${this.baseEndpoint}/crear-archivo`,formData);
  }

  public editarArchivo(a: Archivo, archivo: File): Observable<HttpEvent<{}>>{
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', a.nombre);
    formData.append('comentario', a.comentario);
    formData.append('tipo', a.tipo);
    
    const req = new HttpRequest('PUT',`${this.baseEndpoint}/editar-archivo/${a.id}`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
    //return this.http.put<Archivo>(`${this.baseEndpoint}/editar-archivo/${a.id}`,formData);
  }
  
}

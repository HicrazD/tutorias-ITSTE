import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

@Directive()
export abstract class CommonService <E extends Generic>{

  protected baseEndpoint:string
  protected cabecera: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) { }

  public listar():Observable<E[]>{
    return this.http.get<E[]>(this.baseEndpoint)
  }

  public listarPaginas(page:string, size: string): Observable<any>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);

    return this.http.get<any>(`${this.baseEndpoint}/pagina`, {params:params})
  }

  public ver(id: number):Observable<E>{
    return this.http.get<E>(`${this.baseEndpoint}/${id}`)
  }

  public crear(e:E):Observable<E>{
    return this.http.post<E>(this.baseEndpoint, e, {headers: this.cabecera})
  }

  public editar(e:E):Observable<E>{
    return this.http.put<E>(`${this.baseEndpoint}/${e.id}`,e, {headers: this.cabecera})
  }

  public eliminar(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`)
  }
}

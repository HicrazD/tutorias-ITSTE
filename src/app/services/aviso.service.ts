import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_BAKEND } from '../config/config';
import { Aviso } from '../models/aviso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AvisoService extends CommonService<Aviso> {
  protected baseEndpoint = URL_BAKEND + '/api/avisos-tutorias'
  constructor(protected http:HttpClient){
    super(http)
  }
}

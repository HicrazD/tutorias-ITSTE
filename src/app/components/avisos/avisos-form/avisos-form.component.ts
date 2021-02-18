import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aviso } from 'src/app/models/aviso';
import { Usuario } from 'src/app/models/usuario';
import { ArchivoService } from 'src/app/services/archivo.service';
import { AvisoService } from 'src/app/services/aviso.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-avisos-form',
  templateUrl: './avisos-form.component.html',
  styleUrls: ['./avisos-form.component.css']
})
export class AvisosFormComponent
  extends CommonFormComponent<Aviso, AvisoService> implements OnInit {

  usuario: Usuario = new Usuario()

  constructor(service: AvisoService, public archivoService: ArchivoService,
    router: Router, route: ActivatedRoute) {
    super(service, router, route);
    this.titulo = 'Avisos';
    this.model = new Aviso();
    this.redirect = '/avisos/list';
    this.nombreModel = Aviso.name;
  }

}

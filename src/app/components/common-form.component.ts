import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Generic } from '../models/generic';
import Swal from 'sweetalert2'
import { CommonService } from '../services/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Directive()
export abstract class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  titulo: string;
  model: E;
  error: any;
  protected redirect: string;
  protected nombreModel: string;


  constructor(protected service: S, 
    protected router: Router,
    protected route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if(id){
        this.service.ver(id).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
        });
      }
    })
  }


  public crear(): void {
    this.service.crear(this.model).subscribe(m => {
      //console.log(m);
      Swal.fire('Nuevo:', `${this.nombreModel} creado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    }, err => {
      if(err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public editar(): void {
    this.service.editar(this.model).subscribe(m => {
      //console.log(m);
      Swal.fire('Modificado:', `${this.nombreModel}actualizado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    }, err => {
      if(err.status === 400 || err.status === 500){
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

}

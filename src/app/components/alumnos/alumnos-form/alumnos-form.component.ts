import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../../common-form.component';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent
extends CommonFormComponent<Alumno, AlumnoService> implements OnInit  {
  alumno: Alumno = new Alumno()
  usuario: Usuario
  constructor(service: AlumnoService,
    router: Router,
    route: ActivatedRoute) {
      
    super(service, router, route);
    this.titulo = 'Crear Alumnos';
    this.model = new Alumno();
    this.redirect = '/alumnos';
    this.nombreModel = Alumno.name;
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      const id:number = +params.get('id')
      if(id)
      this.service.ver(id).subscribe(a => {
        console.log(a.usuario)
        this.alumno = a
        this.usuario = this.alumno.usuario
        
      })
    })
  }

  public editar():void{
    this.service.editar(this.alumno).subscribe(alumno =>{
      console.log(alumno)
      Swal.fire('Modificado:', `${this.nombreModel} ${alumno.nombre} actualizado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    });

  }

}

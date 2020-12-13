import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/role.service';
import { CommonListarComponent } from '../../alumnos/common-listar.component';

@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.css']
})
export class RolUsuarioComponent implements OnInit {
 docenteT='Docente'
 alumnoT='Alumno'
 constructor() {}
 ngOnInit(){}
}

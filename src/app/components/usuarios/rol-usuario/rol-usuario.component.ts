import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.css']
})
export class RolUsuarioComponent implements OnInit {
 docenteT='Docente'
 alumnoT='Alumno'
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uformulario-alumno',
  templateUrl: './uformulario-alumno.component.html',
  styleUrls: ['./uformulario-alumno.component.css']
})
export class UformularioAlumnoComponent implements OnInit {
  error: any
  alumno: Alumno
  usuario: Usuario
  afirmacion: string
  loading:boolean
  semestre = [
    { valor: 'PRIMERO', muestraValor: 'PRIMERO' },
    { valor: 'SEGUNDO', muestraValor: 'SEGUNDO' },
    { valor: 'TERCERO', muestraValor: 'TERCERO' },
    { valor: 'CUARTO', muestraValor: 'CUARTO' },
    { valor: 'QUINTO', muestraValor: 'QUINTO' },
    { valor: 'SEXTO', muestraValor: 'SEXTO' },
    { valor: 'SEPTIMO', muestraValor: 'SEPTIMO' },
    { valor: 'OCTAVO', muestraValor: 'OCTAVO' },
    { valor: 'NOVENO', muestraValor: 'NOVENO' },
    { valor: 'DECIMO', muestraValor: 'DECIMO' },
    { valor: 'ONCEAVO', muestraValor: 'ONCEAVO' }
  ];

  grupo = [
    { valor: 'A', muestraValor: 'A' },
    { valor: 'B', muestraValor: 'B' },
    { valor: 'C', muestraValor: 'C' },
    { valor: 'D', muestraValor: 'D' },
  ];

  carrera = [
    { valor: 'ISC', muestraValor: 'ISC' },
    { valor: 'IAD', muestraValor: 'IAD' },
    { valor: 'GAS', muestraValor: 'GAS' },
    { valor: 'LOG', muestraValor: 'LOG' },
    { valor: 'IDC', muestraValor: 'IDC' },
  ];
  constructor(private service: AlumnoService,private router: Router) {
    this.alumno = new Alumno();
    this.usuario = new Usuario();
    this.usuario.username = ''
    this.afirmacion = ''
    this.loading = false
  }

  ngOnInit(): void {
  }

  contraStatus(password: string) {
    password = password.replace(/ /g, "")
    if (password.length > 5) {
      this.usuario.password = password
      console.log(this.usuario.password)
    }
  }


  guardar() {
    this.loading = true
    this.usuario.username = this.usuario.username.replace(/ /g, "")
    if (this.usuario.username.length < 5) {
      this.loading = false
      return Swal.fire('Usuario:', 'El nombre de usuario debe tener mas de 4 caracteres', 'warning')
    }
    if (this.usuario.password == this.afirmacion && this.usuario.password.length > 5) { 
     /*
      console.log(this.usuario)
      console.log(this.alumno)
      */
     this.alumno.usuario = this.usuario
      this.service.crearAlumno(this.alumno).subscribe(() => { 
        this.loading = false
        Swal.fire('Exito:',` Usuario ${this.usuario.username} creado con éxito!`,'success')
        this.router.navigate(['/login'])
      },
      err => {
        this.loading = false
        if (err.status === 400) {
          this.error = err.error
        } else {
          console.log('problemas al crear alumno')
        }
      })
    }    
  }
}

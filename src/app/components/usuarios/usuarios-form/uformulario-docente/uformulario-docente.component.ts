import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from 'src/app/models/docente';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { DocenteService } from 'src/app/services/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uformulario-docente',
  templateUrl: './uformulario-docente.component.html',
  styleUrls: ['./uformulario-docente.component.css']
})
export class UformularioDocenteComponent implements OnInit {
  error: any
  docente: Docente
  usuario: Usuario
  afirmacion: string
  loading:boolean
  role:Roles
  division = [
    { valor: 'ISC', muestraValor: 'ISC' },
    { valor: 'IAD', muestraValor: 'IAD' },
    { valor: 'GAS', muestraValor: 'GAS' },
    { valor: 'LOG', muestraValor: 'LOG' },
    { valor: 'IDC', muestraValor: 'IDC' },
  ];

  constructor(private service:DocenteService,private router: Router) { 
    this.docente = new Docente();
    this.usuario = new Usuario();
    this.afirmacion = ''
    this.loading = false
    this.usuario.username = ''
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
     this.docente.usuario = this.usuario
      this.service.crearDocente(this.docente).subscribe(() => { 
        this.loading = false
        Swal.fire('Exito:',`Usuario ${this.usuario.username} creado con éxito!`,'success')
        this.router.navigate(['/login'])
      },
      err => {
        this.loading = false
        if (err.status === 400) {
          this.error = err.error
          console.log(this.error)
        } else {
          console.log('problemas al crear usuario')
        }
      })
    }    
  }

}

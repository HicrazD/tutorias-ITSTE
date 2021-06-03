import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/app/models/docente';
import { Sesion } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DocenteService } from 'src/app/services/docente.service';
import { SesionService } from 'src/app/services/sesion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sesion-fom',
  templateUrl: './sesion-fom.component.html',
  styleUrls: ['./sesion-fom.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SesionFomComponent implements OnInit {
  error: any
  usuario: Usuario
  docente: Docente
  sesion: Sesion
  selectedValue: string;
  title: string = 'Crear Sesion'
  modalidad = [
    { valor: 'Grupal', viewValue: 'Grupal' },
    { valor: 'Individual', viewValue: 'Individual' },
    { valor: 'Virtual', viewValue: 'Virtual' }
  ];

  todayNumber: number = Date.now();
  todayString: string = new Date().toDateString();
  constructor(private route: ActivatedRoute, public authService: AuthService,
    private router: Router, private sesionService: SesionService,
    private docenteService: DocenteService,
    private usuarioService: UsuarioService) {
    this.usuario = new Usuario()
    this.sesion = new Sesion()
    this.docente = new Docente()
  }

  ngOnInit() {

    this.usuarioService.filtrarUsernambre(this.authService.usuario.username).subscribe(u => {
  //    console.log(u)
      this.usuario = u
    })

    this.docenteService.filtrarPorUsuarioUsername(this.authService.usuario.username).subscribe(u => {
   //   console.log(u)
      if (u)
        this.docente = u
    })


    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.sesionService.ver(id).subscribe(sesion => this.sesion = sesion)
      }
    })

  }

  crearYAsignarSesion() {
   // console.log(typeof(this.sesion.horaEntrada))

    if (this.usuario.username === this.authService.usuario.username && this.sesion.numSesion > 0) {
      this.docenteService.crearYAsignarSesion(this.docente, this.sesion).subscribe(d => {
      //  console.log(d.sesiones)
        this.router.navigate([`/sesiones-ver/${this.authService.usuario.username}`])
        Swal.fire('Exito!',`Sesion creada con exito`,'success')
      }, err => {
        this.error = err.error
      //  console.log('errores')
      //  console.log(this.error)
        if (err.status == 400) {
          Swal.fire('Error', ` No se pudo crear la sesion`, 'error')
        }
      })
    } else {
      Swal.fire('Error', 'No se pudo crear la Sesion', 'error')
    }
  }

  editar() {
    this.sesionService.editar(this.sesion).subscribe(sesion => {
      this.sesion = sesion
     //  console.log(this.sesion)
      this.router.navigate([`/sesiones-ver/${this.authService.usuario.username}`])
      Swal.fire('Exito',`Sesion edita y salvada`,'success')
    }, err => {
      this.error = err.error
      // console.log('errores')
      // console.log(this.error)
      Swal.fire('Error', ` No se pudo editar la sesion`, 'error')

    })

  }
}

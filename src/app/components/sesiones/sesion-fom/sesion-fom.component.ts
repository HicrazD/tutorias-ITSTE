import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Docente } from 'src/app/models/docente';
import { Sesion } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
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
  mostrarList:boolean
  btnPulsado:boolean = true
  error: any
  alumnosAgregados:Alumno[]
  usuario: Usuario
  docente: Docente
  sesion: Sesion
  selectedValue: string;
  title: string = 'Crear Sesion'
  modalidad = [
    { valor: 'Grupal', viewValue: 'Grupal' },
    { valor: 'Individual', viewValue: 'Individual' }
  ];

  todayNumber: number = Date.now();
  todayString: string = new Date().toDateString();
  constructor(private route: ActivatedRoute, public authService: AuthService,
    private router: Router, private sesionService: SesionService,public alumnoService:AlumnoService,
    private docenteService: DocenteService,
    private usuarioService: UsuarioService) {
    this.usuario = new Usuario()
    this.sesion = new Sesion()
    this.docente = new Docente()
    this.alumnosAgregados = []
    this.mostrarList = true
  }

  ngOnInit() {

    this.docenteService.filtrarPorUsuarioUsername(this.authService.usuario.username).subscribe(u => {
   //   console.log(u)
      if (u)
        {
          this.docente = u
          this.usuario = this.docente.usuario
        }
    })
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.sesionService.ver(id).subscribe(sesion => {
          
          this.sesion = sesion
          this.mostrarList = false
        })
      }
    })

  }

  limpiarLista(){
    this.alumnosAgregados = []
  }

  removeItem(alumno:Alumno){
    if(this.alumnosAgregados.length > 0)
    this.alumnosAgregados = this.alumnosAgregados.filter(a => a!= alumno)
  }

  btnAddAll(){
    this.alumnosAgregados = this.docente.alumnos
  }

  btnAdd(alumno:Alumno){
    let existe = this.alumnosAgregados.filter(a => a == alumno)
    if(existe.length == 0)
    this.alumnosAgregados.push(alumno)    
  }

  crearYAsignarSesion() {
   // console.log(typeof(this.sesion.horaEntrada))

   Swal.fire({
    title: 'Advertencia:',
    text: `Una vez seleccionados los tutorados, no se volvera a modificar la lista.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Crear de todas formas!'
  }).then((result) => {
    if (result.value) {
      this.crear()
    }
  });

  
  }

  crear(){
    this.btnPulsado = false
    if (this.usuario.username === this.authService.usuario.username && this.sesion.numSesion > 0) {
      this.sesion.alumnos = this.alumnosAgregados
      this.docenteService.crearYAsignarSesion(this.docente, this.sesion).subscribe(d => {
      //  console.log(d.sesiones)
       
        this.router.navigate([`/sesiones-ver/${this.authService.usuario.username}`])
        Swal.fire('Exito!',`Sesion creada con exito`,'success')
      }, err => {
        this.btnPulsado = true
        this.error = err.error
      //  console.log('errores')
      //  console.log(this.error)
        if (err.status == 400) {
          Swal.fire('Error', ` No se pudo crear la Sesion`, 'error')
        }
      })
    } else {
      this.btnPulsado = true
      Swal.fire('Error', 'No se pudo crear la Sesion', 'error')
    }
  }

  editar() {
    this.btnPulsado = true
    this.sesion.alumnos = this.alumnosAgregados
    this.sesionService.editar(this.sesion).subscribe(sesion => {
      this.sesion = sesion
     //  console.log(this.sesion)
      this.router.navigate([`/sesiones-ver/${this.authService.usuario.username}`])
      Swal.fire('Exito',`Sesion edita y salvada`,'success')
    }, err => {
      this.btnPulsado = true
      this.error = err.error
      // console.log('errores')
      // console.log(this.error)
      Swal.fire('Error', ` No se pudo editar la sesion`, 'error')

    })

  }

}

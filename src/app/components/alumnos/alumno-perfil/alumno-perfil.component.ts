import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

// Recodar poner una tabla en ves donde esta los inputs del button editar
@Component({
  selector: 'app-alumno-perfil',
  templateUrl: './alumno-perfil.component.html',
  styleUrls: ['./alumno-perfil.component.css']
})
export class AlumnoPerfilComponent implements OnInit {
  selected = 'None';
  usuario: Usuario
  alumnos: Alumno = new Alumno()
  alumno: Alumno
  error:any
  tabIndex = 0;

  mostrarColumnas: string[] = ['id','nombre', 'apellido','correo','carrera'];
  mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'correo', 'carrera','eliminar'];

  constructor(private route: ActivatedRoute,
    private router:Router,
    private alumnoService: AlumnoService,
    private usuarioService:UsuarioService) { }

    ngOnInit(){
     
      this.route.paramMap.subscribe(params =>{
        const username:string = params.get('term')
        if(username)
        this.usuarioService.filtrarUsernambre(username).subscribe(u =>{
          console.log(u)
          this.usuario = u
          })
      })

      this.route.paramMap.subscribe(params =>{
        const username:string = params.get('term')
        if(username)
        this.alumnoService.filtrarPorUsuarioUsername(username).subscribe(a =>{
          console.log(a)
          if(a)
          this.alumno = a
          })
      })
    }


    public createAlumno():void{    
      this.route.paramMap.subscribe(params => {
        const username: string = params.get('term');
        if(username){
            this.alumnoService.crearPorUsuarioId(this.alumnos,username)
            .subscribe(alumno =>{
              console.log(alumno);
              alert(`Alumno ${alumno.nombre} creado con exito`);
              this.router.navigate(['/alumnos']);
            },err => {
                if(err.status === 400){
                  this.error = err.error;
                  console.log(this.error);
                }
              })
        }
      })
        }

        public editar(): void {
          this.alumnoService.editar(this.alumno).subscribe(m => {
            console.log(m + 'usuario actualisado segun');
            Swal.fire('Modificado:', `Alumno actualizado con éxito`, 'success');
            this.router.navigate(['/alumnos']);
          },err => {
            if(err.status === 400){
              this.error = err.error;
              console.log(this.error);
            }
          });
        }

}

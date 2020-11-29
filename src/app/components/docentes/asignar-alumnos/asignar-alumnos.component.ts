import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Docente } from 'src/app/models/docente';
import { AlumnoService } from 'src/app/services/alumno.service';
import { DocenteService } from 'src/app/services/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {
  docente: Docente
  alumnosAsignar: Alumno[] = []
  alumnos: Alumno[] = []

  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  tabIndex = 0;

  mostrarColumnas: string[] = ['nombre', 'apellido','seleccion'];
  mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'correo', 'carrera','eliminar'];
  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);
  
  constructor(private route: ActivatedRoute,
    private docenteService: DocenteService,
    private alumnoService: AlumnoService) { }

  ngOnInit(){

    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.docenteService.ver(id).subscribe(c => {
        this.docente = c;
        this.alumnos = this.docente.alumnos;
        this.iniciarPaginador();

      });
    });
  }

  iniciarPaginador(): void{
    this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
    this.dataSource.paginator = this.paginator;
  }

  seleccionarDesSeleccionarTodos(): void {
    this.estanTodosSeleccionados()?
    this.seleccion.clear(): 
    this.alumnosAsignar.forEach(a => this.seleccion.select(a));
  }

  estanTodosSeleccionados(): boolean {
    const seleccionados = this.seleccion.selected.length;
    const numAlumnos = this.alumnosAsignar.length;
    return (seleccionados === numAlumnos);
  }

  filtrar(nombre: string):void {
    nombre = nombre !== undefined? nombre.trim(): '';
    if(nombre !== ''){
      this.alumnoService.filtrarPorNombre(nombre)
      .subscribe(alumnos => this.alumnosAsignar = alumnos.filter(a => {
        let filtrar = true;
        this.alumnos.forEach(ca => {
          if(a.id === ca.id){
            filtrar = false;
          }
        });
        return filtrar;
      }));
    }
  }

  asignar(): void {
    console.log(this.seleccion.selected);
    this.docenteService.asignarAlumnos(this.docente, this.seleccion.selected)
    .subscribe(c => {
      this.tabIndex = 2;
      Swal.fire(
        'Asignados:',
        `Alumnos Asignados con éxito al curso ${this.docente.nombre}`,
        'success'
      );
      this.alumnos = this.alumnos.concat(this.seleccion.selected);
      this.iniciarPaginador();
      this.alumnosAsignar = [];
      this.seleccion.clear();
    },
    e => {
       
      if(e.status === 500){
        const mensaje = e.error.message as string;
        if(mensaje.indexOf('ConstraintViolationException') > -1){
          Swal.fire(
            'Cuidado:',
            'No se puede asignar el alumno ya está asociado a otro curso.',
            'error'
          );
        }
      }
    });
  }

  eliminarAlumno(alumno: Alumno): void {

    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${alumno.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.docenteService.eliminarAlumno(this.docente, alumno)
        .subscribe(docente => {
          this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
          this.iniciarPaginador();
          Swal.fire(
            'Eliminado:',
            `Alumno ${alumno.nombre} eliminado con éxito del docente ${docente.nombre}.`,
            'success'
          );
        });    

      }
    });


  }

}

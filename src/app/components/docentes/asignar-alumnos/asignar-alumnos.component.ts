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
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { Asistencia } from 'src/app/models/asistencia';
import { MatDialog } from '@angular/material/dialog';
import { HojaCanalizacionComponent } from '../../reportes-plantilla/hoja-canalizacion/hoja-canalizacion.component';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {
  btnPulsado:boolean = true
  docente: Docente
  filtro:string = ' '
  filtroMatricula:number = 0
  alumnosAsignar: Alumno[] = []
  alumnos: Alumno[] = []
  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  tabIndex = 0;

  mostrarColumnas: string[] = ['nombre', 'apellido','carrera','seleccion'];
  mostrarColumnasAlumnos: string[] = ['id','nombre', 'apellido', 'correo', 'carrera','semestre','hc','detalles','eliminar'];
  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);
  
  constructor(private route: ActivatedRoute,
    private docenteService: DocenteService,private asistenciaService:AsistenciaService,
    private alumnoService: AlumnoService,
    public dialog: MatDialog) { }

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

  filtrarMatricula(matricula: number):void {
    matricula = +matricula
    if(matricula > 0){
      this.alumnoService.filtrarAlumnoByMatricula(matricula)
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
    this.btnPulsado = false
    //console.log(this.seleccion.selected);
    this.docenteService.asignarAlumnos(this.docente, this.seleccion.selected)
    .subscribe(c => {
      this.tabIndex = 2;
      this.filtro = ''
      this.filtroMatricula = 0
      this.btnPulsado = true
      Swal.fire(
        'Asignados:',
        `Alumnos Asignados con éxito :)`,
        'success'
      );
      this.alumnos = this.alumnos.concat(this.seleccion.selected);
      this.iniciarPaginador();
      this.alumnosAsignar = [];
      this.seleccion.clear();
    },
    e => {
       this.btnPulsado = true
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

  exportexcel(): void {
    let element = document.getElementById('alumnosTable');
 //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element.d)
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    FileSaver.saveAs(data, this.docente.nombre +'_alumnos_asignados' + '_export_' + '.xlsx')
  }

  btnHC(alumno:Alumno): void{
    const modalRef = this.dialog.open(HojaCanalizacionComponent, {
      width: '2000px',
      height:'1500px',
      data: {a:alumno,docente:this.docente}
    });
  }
}

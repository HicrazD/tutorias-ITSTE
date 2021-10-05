import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import { FormControl } from '@angular/forms';
import { Examen } from 'src/app/models/examen';

import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Docente } from 'src/app/models/docente';
import { DocenteService } from 'src/app/services/docente.service';
import { ResultadoService } from 'src/app/services/resultado.service';
import { VerResultadosModalComponent } from '../ver-resultados-modal/ver-resultados-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Resultado } from 'src/app/models/resultado';

@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html',
  styleUrls: ['./asignar-examenes.component.css']
})
export class AsignarExamenesComponent implements OnInit {
  loading:boolean
  docente: Docente;
  //docentes: Docente[]
  autocompleteControl = new FormControl();
  examenesFiltrados: Examen[] = [];
  resultados: Resultado[] = []
  evaluacionSeleccionada: Examen
  //examenesAsignar: Examen[] = [];
  examenes: Examen[] = [];

  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions = [3, 5, 10, 20, 50];

  mostrarColumnas = ['nombre', 'eliminar'];
  mostrarColumnasExamenes = ['id', 'nombre', 'resultado', 'eliminar'];
  tabIndex = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private docenteService: DocenteService,
    private examenService: ExamenService,
    private resultadoService: ResultadoService,
    public dialog: MatDialog) {
    this.evaluacionSeleccionada = new Examen()
    this.loading = false 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.docenteService.ver(id).subscribe(c => {
          this.docente = c;
          this.examenes = this.docente.examenes;
          //console.log(c)
          this.iniciarPaginador();

        });
      }else{
        this.examenService.listar().subscribe(e => this.examenesFiltrados = e)
      }

      
    });
    /*
        this.autocompleteControl.valueChanges.pipe(
          map(valor => typeof valor === 'string' ? valor : valor.nombre),
          flatMap(valor => valor ? this.examenService.filtrarPorNombre(valor) : [])
        ).subscribe(examenes => this.examenesFiltrados = examenes);*/
  }

  private iniciarPaginador() {
    this.dataSource = new MatTableDataSource<Examen>(this.examenes);
    this.dataSource.paginator = this.paginator;
    //this.paginator._intl.itemsPerPageLabel = 'Registros por página';
  }

  regresar(){
    this.router.navigate(['/docentes'])
  }
  mostrarNombre(examen?: Examen): string {
    return examen ? examen.nombre : '';
  }

  verResultados(examen: Examen): void {
    this.resultadoService.findByResultadoByDocente(this.docente, examen)
      .subscribe(rs => {
        // console.log(rs)
        const modalRef = this.dialog.open(VerResultadosModalComponent, {
          width: '750px',
          data: { docente: this.docente, examen: examen, resultados: rs }
        });

        modalRef.afterClosed().subscribe(() => {
          //  console.log('Modal ver resultados cerrado');
        })
      });
  }
  /*
    seleccionarExamen(event: MatAutocompleteSelectedEvent): void {
      const evaluacion = event.option.value as Examen;
      console.log(this.examenesAsignar);
      
      if (!this.existe(evaluacion.id)) {
        this.examenesAsignar = this.examenesAsignar.concat(evaluacion);
       // this.evaluacionSeleccionada = evaluacion
       // console.log(this.examenesAsignar);
      } else {
        Swal.fire(
          'Error:',
          `La evaluacion ${evaluacion.nombre} ya está asignada al docente`,
          'error'
        );
      }
  
      this.autocompleteControl.setValue('');
      event.option.deselect();
      event.option.focus();
    }
  */
  /*
    private existe(id: number): boolean {
      let existe = false;
      this.examenesAsignar.concat(this.examenes)
        .forEach(e => {
          if (id === e.id) {
            existe = true;
          }
        });
      return existe;
    }
  */
  /*
    eliminarDelAsignar(examen: Examen){
      this.examenesAsignar = this.examenesAsignar.filter(
        e=> examen.id !== e.id
      );
    }
    */
  /*
    asignar(): void {
     // console.log(this.examenesAsignar);
      this.docenteService.asignarExamenes(this.docente, this.examenesAsignar)
      .subscribe(docente => {
        this.examenes = this.examenes.concat(this.examenesAsignar);
        this.iniciarPaginador();
        this.examenesAsignar = [];
  
        Swal.fire(
          'Asignados:',
          `Evaluacion(es) asignada(s) con exito a : ${docente.nombre}`,
          'success'
        );
        this.tabIndex = 2;
      })
    }
    */
  seleccionar(e: Examen) {
    this.loading = true
    this.evaluacionSeleccionada = e
  }

  asignarTodos() {    
    this.docenteService.asignarExamenesTodos(this.evaluacionSeleccionada).subscribe(docentes => {
     // this.docentes = docentes
      //console.log(this.docentes)
      this.loading = false
      Swal.fire('Asigar Evaluaciones', ` Evaluaciones agregadas`, 'success')
      this.router.navigate(['/docentes'])
    }, err => {
      this.loading = false
      console.log(err.error)
    }
    )
  }

  eliminarExamenDelCurso(evaluacion: Examen): void {
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar  ${evaluacion.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.docenteService.eliminarExamen(this.docente, evaluacion)
          .subscribe(docente => {
            this.examenes = this.examenes.filter(e => e.id !== evaluacion.id);
            this.iniciarPaginador();
            Swal.fire(
              'Eliminado:',
              `Evaluacion ${evaluacion.nombre} eliminada con éxito del docente ${docente.nombre}.`,
              'success'
            );
          });

      }
    });

  }

}

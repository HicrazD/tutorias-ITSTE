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

  docente: Docente;
  docentes:Docente[]
  autocompleteControl = new FormControl();
  examenesFiltrados: Examen[] = [];
  resultados:Resultado[] = []
  examenesAsignar: Examen[] = [];
  examenes: Examen[] = [];

  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageSizeOptions = [3, 5, 10, 20, 50];

  mostrarColumnas = ['nombre','eliminar'];
  mostrarColumnasExamenes = ['id', 'nombre','resultado','eliminar'];
  tabIndex = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private docenteService: DocenteService,
    private examenService: ExamenService,
    private resultadoService:ResultadoService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.docenteService.ver(id).subscribe(c => {
        this.docente = c;
        this.examenes = this.docente.examenes;
        //console.log(c)
        this.iniciarPaginador();

      });


    });
    this.autocompleteControl.valueChanges.pipe(
      map(valor => typeof valor === 'string' ? valor : valor.nombre),
      flatMap(valor => valor ? this.examenService.filtrarPorNombre(valor) : [])
    ).subscribe(examenes => this.examenesFiltrados = examenes);
  }

  private iniciarPaginador(){
    this.dataSource = new MatTableDataSource<Examen>(this.examenes);
    this.dataSource.paginator = this.paginator;
    //this.paginator._intl.itemsPerPageLabel = 'Registros por página';
  }

  mostrarNombre(examen?: Examen): string {
    return examen ? examen.nombre : '';
  }

  verResultados(examen: Examen): void {
    this.resultadoService.findByResultadoByDocente(this.docente,examen)
    .subscribe(rs => {
     // console.log(rs)
      const modalRef = this.dialog.open(VerResultadosModalComponent, {
        width: '750px',
        data: {docente: this.docente, examen: examen,resultados:rs}
      });

      modalRef.afterClosed().subscribe(() => {
      //  console.log('Modal ver resultados cerrado');
      })
    });
  }

  seleccionarExamen(event: MatAutocompleteSelectedEvent): void {
    const examen = event.option.value as Examen;

    if (!this.existe(examen.id)) {
      this.examenesAsignar = this.examenesAsignar.concat(examen);

     // console.log(this.examenesAsignar);
    } else {
      Swal.fire(
        'Error:',
        `La evaluacion ${examen.nombre} ya está asignada al curso`,
        'error'
      );
    }

    this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }

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

  eliminarDelAsignar(examen: Examen){
    this.examenesAsignar = this.examenesAsignar.filter(
      e=> examen.id !== e.id
    );
  }

  asignar(): void {
   // console.log(this.examenesAsignar);
    this.docenteService.asignarExamenes(this.docente, this.examenesAsignar)
    .subscribe(docente => {
      this.examenes = this.examenes.concat(this.examenesAsignar);
      this.iniciarPaginador();
      this.examenesAsignar = [];

      Swal.fire(
        'Asignados:',
        `Evaluaciones asignadas con éxito al curso ${docente.nombre}`,
        'success'
      );
      this.tabIndex = 2;
    })
  }
  asignarTodos(){
    this.docenteService.asignarExamenesTodos(this.examenesAsignar).subscribe(docentes =>
      {this.docentes=docentes
     // console.log(this.docentes)},e=>{console.log(e.status)
      Swal.fire('Asigar Evaluaciones',` Evaluaciones agregadas`,'success')
      this.router.navigate(['/docentes'])
      }
      )
  }

  eliminarExamenDelCurso(examen: Examen): void {
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar  ${examen.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.docenteService.eliminarExamen(this.docente, examen)
        .subscribe(curso => {
          this.examenes = this.examenes.filter(e => e.id !== examen.id);
          this.iniciarPaginador();
          Swal.fire(
            'Eliminado:',
            `Evaluacion ${examen.nombre} eliminada con éxito del curso ${curso.nombre}.`,
            'success'
          );
        });    

      }
    });    

  }

}

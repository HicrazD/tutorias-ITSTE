import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Archivo } from 'src/app/models/archivo';
import { Docente } from 'src/app/models/docente';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ArchivoService } from 'src/app/services/archivo.service';
import { DocenteService } from 'src/app/services/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  archivos: Archivo[]
  alumnoMatricula: Alumno = new Alumno()
  docentesFind: Docente[]
  tabIndex = 0;

  division: string
  nombreOrApellido: string

  mostrarColumnas: string[] = ['nombre', 'apellido', 'correo', 'division', 'detalles'];
  mostrarColumnasAchivo:string[] = ['nombre', 'tipo','ver','detalles'];
  constructor(private route: ActivatedRoute,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService,
    private archivoService: ArchivoService) { }

  ngOnInit() {

  }

  filtrar(matricula: number): void {
    let m: number = matricula
    let mString: string = m.toString()
    if (mString.length == 7) {
      console.log(matricula)
      this.alumnoService.filtrarAlumnoByMatricula(matricula).subscribe(m => {
        this.alumnoMatricula = m
        console.log(this.alumnoMatricula)
      })
    }
  }

  fieldDivision(div: string) {
    div = div !== undefined ? div.trim() : '';
    if (div !== '') {
      this.division = div
    }
  }

  fieldNOrA(term: string) {
    term = term !== undefined ? term.trim() : '';
    if (term !== '') {
      this.nombreOrApellido = term
    }
  }

  show() {
    if (this.division == undefined || this.nombreOrApellido == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Falta rellenar campos',
      })
    } else {
      console.log(this.division)
      console.log(this.nombreOrApellido)

      this.docenteService.filtrarPorDivision(this.division, this.nombreOrApellido)
        .subscribe(docentes => {
          this.docentesFind = docentes
          console.log('Docentes encontrados')
          console.log(this.docentesFind)
        });
    }
  }

  filtrarTipoArchivo(term: string) {
    term = term !== undefined ? term.trim() : '';
    if (term !== '') {
      this.archivoService.filtrarTipoArchivo(term).subscribe(
        archivo => this.archivos = archivo)
    }
  }
}

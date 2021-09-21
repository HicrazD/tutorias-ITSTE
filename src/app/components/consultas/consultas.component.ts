import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_BAKEND } from 'src/app/config/config';
import { Alumno } from 'src/app/models/alumno';
import { Archivo } from 'src/app/models/archivo';
import { Docente } from 'src/app/models/docente';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ArchivoService } from 'src/app/services/archivo.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocenteService } from 'src/app/services/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  urlBackend = URL_BAKEND
  archivosWord: Archivo[]
  archivosPdf: Archivo[]
  archivosExcel: Archivo[]
 // alumnoMatricula: Alumno = new Alumno()
 // docentesFind: Docente[]
  tabIndex = 0;
  tabIndexSub = 0
 // division: string
 // nombreOrApellido: string
  tipo = "WORD FORMATO"
  tpdf = "PDF FORMATO"
  texcel = "EXCEL FORMATO"
 // mostrarColumnas: string[] = ['nombre', 'apellido', 'correo', 'division', 'detalles'];
  mostrarColumnasAchivo: string[] = ['nombre', 'tipo', 'ver', 'detalles'];
  constructor(private archivoService: ArchivoService,  public authService: AuthService) { }

  ngOnInit() {
    this.archivoService.filtrarTipoArchivoWord(this.tipo).subscribe(
      archivo => this.archivosWord = archivo)

    this.archivoService.filtrarTipoArchivoPdf(this.tpdf).subscribe(
      archivo => this.archivosPdf = archivo)

    this.archivoService.filtrarTipoArchivoExcel(this.texcel).subscribe(
      archivo => this.archivosExcel = archivo)
  }

  redireccion(archivo: Archivo) {
    //console.log('redireccion')
    //console.log(archivo)
    if (archivo.tipo === 'PDF' || archivo.tipo === 'PDF FORMATO') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-pdf/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'WORD' || archivo.tipo === 'WORD FORMATO') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-word/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'EXCEL' || archivo.tipo === 'EXCEL FORMATO') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-excel/${archivo.id}`, "_blank")
    }
  }
/*
  filtrar(matricula: number): void {
    let m: number = matricula
    let mString: string = m.toString()
    if (mString.length == 7) {
     // console.log(matricula)
      this.alumnoService.filtrarAlumnoByMatricula(matricula).subscribe(m => {
        if(m == null){
          Swal.fire(
            'Alumno?',
            `No existe ningun alumno con matricula ${matricula}`,
            'question'
          )
        }
        else{
          this.alumnoMatricula = m
         // console.log(this.alumnoMatricula)
        }
        
      })
    }
  }
*/
/*
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
     // console.log(this.division)
     // console.log(this.nombreOrApellido)

      this.docenteService.filtrarPorDivision(this.division, this.nombreOrApellido)
        .subscribe(docentes => {
          this.docentesFind = docentes
       //   console.log('Docentes encontrados')
      //  console.log(this.docentesFind)
        });
    }
  }*/

}

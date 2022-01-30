import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Docente } from 'src/app/models/docente';
import { Examen } from 'src/app/models/examen';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';
import { Resultado } from 'src/app/models/resultado';
import { AlumnoService } from 'src/app/services/alumno.service';
import { DocenteService } from 'src/app/services/docente.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import { ResultadoService } from 'src/app/services/resultado.service';
import Swal from 'sweetalert2';
import { ResponderExamenModalComponent } from '../responder-examen-modal/responder-examen-modal.component';
import { VerExamenModalComponent } from '../ver-examen-modal/ver-examen-modal.component';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styleUrls: ['./responder-examen.component.css']
})
export class ResponderExamenComponent implements OnInit {
  resultadoRespuesta: Resultado
  preguntas:Pregunta[] = []
  alumno: Alumno;
  error:any
  docente: Docente;
  examenes: Examen[] = [];
  suma:number = 0
  mostrarColumnasExamenes = ['id', 'nombre', 'preguntas', 'responder', 'ver'];

  pageSizeOptions = [3, 5, 10, 20, 30, 50];

  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService,
    private respuestaService: RespuestaService,
    private resultadoService: ResultadoService,
    public dialog: MatDialog) { 
      this.resultadoRespuesta = new Resultado()
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.alumnoService.ver(id).subscribe(alumno => {
        this.alumno = alumno;
        this.docenteService.obtenerDocentePorAlumnoId(this.alumno).subscribe(
          docente => {
           // console.log(docente)
            this.docente = docente;
            this.examenes = (docente && docente.examenes)? docente.examenes: [];
            this.dataSource = new MatTableDataSource<Examen>(this.examenes);
            this.dataSource.paginator = this.paginator;
            //this.paginator._intl.itemsPerPageLabel = 'Registros por página:';
          }
        );
      });
    });
    
  }

  responderExamen(examen: Examen): void{
    const modalRef = this.dialog.open(ResponderExamenModalComponent, {
      width: '750px',
      data: {docente: this.docente, alumno: this.alumno, examen: examen}
    });

    modalRef.afterClosed().subscribe((respuestasMap: Map<number, Respuesta>) => {
    //  console.log('modal responder examen ha sido enviado y cerrado');
    //  console.log(respuestasMap);
      if(respuestasMap && respuestasMap?.size == examen.preguntas.length){
        const respuestas: Respuesta[] = Array.from(respuestasMap.values());
        this.respuestaService.crear(respuestas).subscribe(rs =>{
          Swal.fire(
            'Enviadas:',
            'Preguntas enviadas con éxito',
            'success'
          );
         // console.log(rs);
         // console.log(rs.filter(r => r.respuesta == 'frecuentemente'))
         if(rs.length > 0 ) this.resultado(rs)
        });
      }
      if(respuestasMap?.size < examen.preguntas.length){
        Swal.fire('Error¡','No debe dejar respuestas vacias','error')
      }
    });
  }
  resultado(respuestas:Respuesta[]){
    let siempre = respuestas.filter(r => r.respuesta == 'Siempre')
    let frecuentemente = respuestas.filter(r => r.respuesta == 'Frecuentemente')
    let pocasVeces = respuestas.filter(r => r.respuesta == 'Pocas veces')
    let nunca = respuestas.filter(r => r.respuesta == 'Nunca')
    let si = respuestas.filter(r => r.respuesta == 'Si')
    let no = respuestas.filter(r => r.respuesta == 'No')
    /*
    console.log('siempre: ' + siempre.length)
    console.log('frecuentemente: ' + frecuentemente.length)
    console.log('pocasVeces: ' + pocasVeces.length)
    console.log('nunca: ' + nunca.length)
    console.log('si: ' + si.length)
    console.log('no: ' + no.length)
*/

   this.preguntas = respuestas.map(resP => resP.pregunta)
   //console.log('respuestas.map')
   //console.log(this.preguntas)
   let multipleTexto = this.preguntas.filter(p => p.tipo == 'Multiple Texto')
   let multipleSn = this.preguntas.filter(p => p.tipo == 'Multiple Si/No')
   let puntajeMax = (multipleTexto.length * 5) + (multipleSn.length * 5)
    let puntajeOptenido = (siempre.length * 5) + (frecuentemente.length * 4) + (pocasVeces.length * 3)
    + (nunca.length * 2) + (si.length * 5) + (no.length * 2);

    let resultadoFinal = (puntajeOptenido * 100) / (puntajeMax)

   // console.log(resultadoFinal)
    let ex = respuestas.map(r => r.pregunta.examen)
    let indice = ex[0]

    const result = new Resultado()
    result.resultado = +resultadoFinal
    result.docente = this.docente
    result.examen = indice
    result.alumno = this.alumno

    this.resultadoService.crear(result).subscribe(results =>{
     // console.log(results)
     },err =>{
         this.error = err
        // console.log(this.error)
       })
  }
  /*
  resultado(respuestas:Respuesta[],i:number){
     let numeros = respuestas.map(r => r.numero)
     console.log(numeros.length)
     if(i < numeros.length)
    {this.suma += numeros[i]
    console.log('suma: ' + this.suma)
    this.resultado(respuestas,i+1)
  }
    else{
      console.log('suma final: ' + this.suma)
      console.log(i + '--' + (numeros.length))
      let ex = respuestas.map(r => r.pregunta.examen)
      let indice = ex[0]
      console.log(indice)
      this.resultadoRespuesta.resultado = this.suma
      this.resultadoRespuesta.alumno = this.alumno
      this.resultadoRespuesta.docente = this.docente
      this.resultadoRespuesta.examen  = indice
      console.log(this.resultadoRespuesta)
      this.resultadoService.crear(this.resultadoRespuesta).subscribe(results =>{
         this.resultadoRespuesta = results
         console.log(results)
        },err =>{
            this.error = err
            console.log(this.error)
          })
    }

  }
  */

  verExamen(examen: Examen): void {
    this.respuestaService.obtenerRespuestasPorAlumnoPorExamen(this.alumno, examen)
    .subscribe(rs => {
    //  console.log(rs)
      const modalRef = this.dialog.open(VerExamenModalComponent, {
        width: '750px',
        data: {docente: this.docente, examen: examen, respuestas: rs}
      });

      modalRef.afterClosed().subscribe(() => {
      //  console.log('Modal ver examen cerrado');
      })
    });
  }

}

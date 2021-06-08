import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno';
import { Docente } from 'src/app/models/docente';
import { Sesion } from 'src/app/models/sesion';

@Component({
  selector: 'app-reac',
  templateUrl: './reac.component.html',
  styleUrls: ['./reac.component.css']
})
export class ReacComponent implements OnInit {
  gp: string = "Grupal"
  ind: String = "Individual"
  docente: Docente;
  alumnos: Alumno[]
  sesiones: Sesion[]
  sesionesTemp: Sesion[]
  numTutorados: number = 0
  mes1: string = 'Mayo'
  mes2: string = 'Junio'
  compararMeses: boolean
  periodo: string = `${this.mes1} - ${this.mes2}`
  select1 = [
    { valor: 'Enero', muestraValor: 'Enero' }, { valor: 'Febrero', muestraValor: 'Febrero' },
    { valor: 'Marzo', muestraValor: 'Marzo' }, { valor: 'Abril', muestraValor: 'Abril' },
    { valor: 'Mayo', muestraValor: 'Mayo' }, { valor: 'Junio', muestraValor: 'Junio' },
    { valor: 'Julio', muestraValor: 'Julio' }, { valor: 'Agosto', muestraValor: 'Agosto' },
    { valor: 'Septiembre', muestraValor: 'Septiembre' }, { valor: 'Octubre', muestraValor: 'Octubre' },
    { valor: 'Noviembre', muestraValor: 'Noviembre' }, { valor: 'Diciembre', muestraValor: 'Diciembre' },
  ];
  bloque1: Sesion[] = []
  bloque2: Sesion[] = []
  rowspan
  url:any = '../../../../assets/form/evaluacion.jpg'
  url2:any = '../../../../assets/form/evaluacion.jpg'
  fechaEntrega:string='08/04/2021'
  descrip1:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis placeat quasi'
  descrip2:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis placeat quasi'
  meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.alumnos = []
    this.sesiones = []
    this.sesionesTemp = []
    this.docente = new Docente()
    this.compararMeses = this.mes1 != this.mes2
  }

  ngOnInit(): void {
    this.docente = this.data.docente as Docente
    this.sesiones = this.data.sesiones as Sesion[]
    console.log(this.sesionesTemp)
    this.alumnos = this.data.docente.alumnos as Alumno[]
    this.numTutorados = this.docente.alumnos.length

        /* console.log(this.docente)
     
     console.log(this.alumnos)*/
  }

  bloques() {
    if (this.compararMeses) {
      this.sesionesTemp.map((sesion,i = 0) =>
        {
          i++
         if(i < 7) this.bloque1.push(sesion)
          else this.bloque2.push(sesion)
       // console.log(i)
      }
      )
//this.bloque1 = this.sesionesTemp.filter(s => s.numSesion < 7)
//      this.bloque2 = this.sesionesTemp.filter(s => s.numSesion >= 7)
    }
  }
  tablaMostrar() {
    this.primerMes()
    this.segundoMes()
  }

  primerMes() {
    //this.mes1 = this.mes1.toLowerCase(); // se convierte el mes a minusculas
    let numMes = this.meses.indexOf(this.mes1) // con el index se busca el numero k corresponde el mes
    console.log()
    this.sesiones.map(s => {
      //const newDate = new Date(s.createAt)
      // console.log(s.createAt.slice(5, 7))
      if (s.createAt.slice(5, 7).indexOf('0') === 0) {
        let m = s.createAt.slice(5, 7).replace('0', '')
        if (m === numMes.toString()) {
          this.sesionesTemp.push(s)
        }

      }
      // console.log(s.createAt.slice(5,7).replace('0',''))    
    }
    )
    console.log(this.sesionesTemp)
  }

  segundoMes() {
    //this.mes2 = this.mes2.toLowerCase(); // se convierte el mes a minusculas
    let numMes = this.meses.indexOf(this.mes2) // con el index se busca el numero k corresponde el mes
    console.log()
    this.sesiones.map(s => {
      //const  newDate = new Date(s.createAt)
      const posicion = s.createAt.slice(5, 7).indexOf('0')
      if (posicion === 0) {
        let m = s.createAt.slice(5, 7).replace('0', '')
        if (m === numMes.toString()) {
          this.sesionesTemp.push(s)
        }
      }
    }
    )
    console.log(this.sesionesTemp)
  }
  
  btnAseptar(){
    this.bloque1 = []
    this.bloque2 = []
    this.sesionesTemp = []
    this.tablaMostrar()
    this.bloques()
    this.rowspan = this.sesionesTemp.length + 1
  }

  seleccionaFoto1(event):void{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); 

      reader.onload = (event) => { 
        this.url = event.target.result;
      }
    }
  }
  seleccionaFoto2(event):void{
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); 

      reader.onload = (event) => { 
        this.url2 = event.target.result;
      }
    }
  }
}

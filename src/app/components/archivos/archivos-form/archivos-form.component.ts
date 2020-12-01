import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo';
import { ArchivoService } from 'src/app/services/archivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos-form',
  templateUrl: './archivos-form.component.html',
  styleUrls: ['./archivos-form.component.css']
})
export class ArchivosFormComponent implements OnInit {

  archivo: Archivo = new Archivo()
  archivoCreate:Archivo  = new Archivo()
  tabIndex = 0;
  archivoSelected: File
  error:any
  tipo = [
    {valor:'WORD',muestraValor:'WORD'},
    {valor:'EXCEL',muestraValor:'EXCEL'},
    {valor:'PDF',muestraValor:'PDF'},
  ];
  progreso: number = 0;
  constructor(private service: ArchivoService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id')
      if (id)
        this.service.ver(id).subscribe(a => {
          console.log(a )
          this.archivo = a
          this.archivoCreate = a
        })
    })
  }


  seleccionarArchivo(event) {
    this.archivoSelected = event.target.files[0]
    console.log(this.archivoSelected)
    //officedocument
    if(this.archivoSelected.type.indexOf('application') ){
      Swal.fire('Error Upload: ', 'Debe seleccionar un archivo tipo pdf o word', 'error');
      this.archivoSelected = null
      console.log(this.archivoSelected)
    }
    
  }

  subirArchivo():void {
    if (!this.archivoSelected) {
      Swal.fire('Error Upload: ', 'Debe seleccionar un archivo', 'error');
    } else {
      console.log('Imprimiendo alumno, usuario y archivo')
      console.log(this.archivoCreate)
      console.log(this.archivoSelected)

      this.service.crearConArchivo(this.archivoCreate, this.archivoSelected)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded / event.total) * 100);
          }else if (event.type === HttpEventType.Response){
            let response: any = event.body;
            this.archivoCreate = response.archivoCreate as Archivo
            this.router.navigate(['/archivos'])
            console.log(this.archivoCreate)
          Swal.fire('Actualizado!', `Archivo ${this.archivoSelected.name}`, 'success')
          } 
        },err => {
          if(err.status === 400 || err.status === 500){
            this.error = err.error;
            console.log(this.error);
          }
        });

    }
  }

  public editarArchivo():void {
    if (!this.archivoSelected || this.archivo.tipo == undefined) {
      Swal.fire('Error Upload: ', 'Faltan por rellenar campos(Posible causa:nombre,tipo,archivo)', 'error');
    } else {
      console.log('Imprimiendo alumno y archivo')
      console.log(this.archivo)
      console.log(this.archivoSelected)

      this.service.editarArchivo(this.archivo, this.archivoSelected)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded / event.total) * 100);
          }else if (event.type === HttpEventType.Response){
            let response: any = event.body;
            this.archivo = response.archivo as Archivo
            this.router.navigate(['/archivos'])
            console.log(this.archivo)
          Swal.fire('Actualizado!', `Archivo ${this.archivoSelected.name}`, 'success')
          }          
        },err => {
          if(err.status === 500){
            this.error = err.error;
            console.log(this.error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Faltaron campos por rellenar',
            })
          }
        });

    }
  }


}

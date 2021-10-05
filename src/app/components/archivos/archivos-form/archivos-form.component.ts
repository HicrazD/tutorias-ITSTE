import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo';
import { ArchivoService } from 'src/app/services/archivo.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos-form',
  templateUrl: './archivos-form.component.html',
  styleUrls: ['./archivos-form.component.css']
})
export class ArchivosFormComponent implements OnInit {
  btnPulsado: boolean = true
  btnPulsado2: boolean = false
  archivo: Archivo
  tabIndex = 0;
  archivoSelected: File
  error: any
  tipo = [
    { valor: 'PDF', muestraValor: 'PDF' },
    { valor: 'WORD', muestraValor: 'WORD' },
    { valor: 'EXCEL', muestraValor: 'EXCEL' },
    { valor: 'PDF FORMATO', muestraValor: 'PDF FORMATO' },
    { valor: 'WORD FORMATO', muestraValor: 'WORD FORMATO' },
    { valor: 'EXCEL FORMATO', muestraValor: 'EXCEL FORMATO' },
  ];
  progreso: number = 0;
  constructor(private service: ArchivoService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) {
      this.archivo = new Archivo()
  }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id')
      if (id)
        this.service.ver(id).subscribe(a => {
          //console.log(a)
          this.archivo = a
        })
    })
  }


  seleccionarArchivo(event) {
    this.archivoSelected = event.target.files[0]
    // console.log(this.archivoSelected)
    if (this.archivoSelected == null) {
      Swal.fire('Upload?: ', 'No selecciono nada', 'question');
    } else {
      if (this.archivoSelected.type.indexOf('application/vnd.openxmlformats-officedocument.word') >= 0) {
        Swal.fire('Success Upload: ', 'Archivo seleccionado', 'success');
        this.archivo.tipo = 'WORD'
        //console.log('condicion word')
      }
      else if (this.archivoSelected.type.indexOf('application/pdf') >= 0) {
        Swal.fire('Success Upload: ', 'Archivo seleccionado', 'success');
        this.archivo.tipo = 'PDF'
        //console.log('condicion pdf')
      }
      else if (this.archivoSelected.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') >= 0) {
        Swal.fire('Success Upload: ', 'Archivo seleccionado', 'success');
        this.archivo.tipo = 'EXCEL'
        //console.log('condicion excel')
      } else {
        Swal.fire('Error Upload: ', 'Debe seleccionar un archivo tipo pdf,word o excel', 'error');
        this.archivoSelected = null
        // console.log('No es pdf word o excel')
      }
    }

  }

regresar(){
  return this.router.navigate(['/archivos'])
}

  subirArchivo(): void {
    this.btnPulsado = false
    if (!this.btnPulsado) {
      if (!this.archivoSelected) {
        this.btnPulsado = true
        Swal.fire('Error Upload: ', 'Debe seleccionar un archivo', 'error');
      } else {
        // console.log('Imprimiendo alumno, usuario y archivo')
        // console.log(this.archivo)
        // console.log(this.archivoSelected)
        if (this.archivo.nombre !== undefined || this.archivo.tipo !== undefined) {
          if (this.archivo.comentario === undefined) {
            this.archivo.comentario = ""
          }
          this.service.crearConArchivo(this.archivo, this.archivoSelected)
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progreso = Math.round((event.loaded / event.total) * 100);
              } else if (event.type === HttpEventType.Response) {
                let response: any = event.body;
                //this.archivo = response.archivo as Archivo
                this.router.navigate(['/archivos'])
                // console.log(this.archivo)
                this.btnPulsado = true
                Swal.fire('Actualizado!', `Archivo ${this.archivoSelected.name}`, 'success')
              }
            }, err => {
              this.btnPulsado = true
              if (err.status === 400 || err.status === 500) {
                this.error = err.error;
                //console.log(this.error);
              }
            });
        } else {
          this.btnPulsado = true
          Swal.fire('Error de datos: ', 'Faltan por rellenar campos(Posible causa:nombre,tipo,archivo)', 'error');
          //console.log(this.archivo.nombre)
        }
      }
    }
  }

  public editarArchivo(): void {
    this.btnPulsado = false
    if (!this.btnPulsado) {
      if (!this.archivoSelected || this.archivo.tipo === undefined || this.archivo.nombre === undefined) {
        this.btnPulsado = true
        Swal.fire('Error Upload: ', 'Faltan por rellenar campos(Posible causa:nombre,tipo,archivo)', 'error');
      } else {
        //  console.log('Imprimiendo alumno y archivo')
        //  console.log(this.archivo)
        //  console.log(this.archivoSelected)

        if (this.archivo.comentario === undefined) {
          this.archivo.comentario = ""
        }

        this.service.editarArchivo(this.archivo, this.archivoSelected)
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progreso = Math.round((event.loaded / event.total) * 100);
            } else if (event.type === HttpEventType.Response) {
              let response: any = event.body;
              //this.archivo = response.archivo as Archivo
              //console.log(this.archivo)
              this.btnPulsado = true
              Swal.fire('Actualizado!', `Archivo ${this.archivoSelected.name}`, 'success')
              this.router.navigate([`/archivos/form/${this.archivo.id}`]);
              // console.log(this.archivo)            
            }
          }, err => {
            this.btnPulsado = false
            if (err.status === 500) {
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

  public editar(): void {
    this.btnPulsado2 = true
    if (this.btnPulsado2) {
      if (this.archivo.comentario === undefined) {
        this.archivo.comentario = ""
      }
      this.service.editar(this.archivo).subscribe(m => {
        //console.log(m);
        this.btnPulsado2 = false
        Swal.fire('Modificado:', `Archivo ${this.archivo.nombre} actualizado con éxito`, 'success');
        this.router.navigate([`/archivos/form/${this.archivo.id}`]);
      }, err => {
        this.btnPulsado2 = false
        if (err.status === 400 || err.status === 405) {
          this.error = err.error;
          console.log(this.error);
        }
      });
    }
  }

}

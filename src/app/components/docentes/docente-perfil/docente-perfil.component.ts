import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URL_BAKEND } from 'src/app/config/config';
import { Archivo } from 'src/app/models/archivo';
import { Docente } from 'src/app/models/docente';
import { Usuario } from 'src/app/models/usuario';
import { ArchivoService } from 'src/app/services/archivo.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente-perfil',
  templateUrl: './docente-perfil.component.html',
  styleUrls: ['./docente-perfil.component.css']
})
export class DocentePerfilComponent implements OnInit {
  urlBackend = URL_BAKEND
  usuario: Usuario
  docentes: Docente = new Docente()
  docente: Docente
  error: any
  tabIndex = 0;
  archivos: Archivo
  archivo: Archivo = new Archivo()
  archivoSelected: File

  tipo = [
    { valor: 'WORD', muestraValor: 'WORD' },
    { valor: 'PDF', muestraValor: 'PDF' },
    { valor: 'EXCEL', muestraValor: 'EXCEL' }
  ];

  division = [
    { valor: 'ISC', muestraValor: 'ISC' },
    { valor: 'IAD', muestraValor: 'IAD' },
    { valor: 'GAS', muestraValor: 'GAS' },
    { valor: 'LOG', muestraValor: 'LOG' },
    { valor: 'IDC', muestraValor: 'IDC' },
  ];

  mostrarColumnasArchivos: string[] = ['nombre', 'comentario', 'tipo', 'archivo', 'eliminar'];
  constructor(private route: ActivatedRoute,public authService: AuthService,
    private router: Router,
    private docenteService: DocenteService,
    private usuarioService: UsuarioService,
    private archivoService: ArchivoService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.usuarioService.filtrarUsernambre(username).subscribe(u => {
      //    console.log(u)
          this.usuario = u
        })
    })

    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.docenteService.filtrarPorUsuarioUsername(username).subscribe(a => {
        //  console.log(a)
          if (a)
            this.docente = a
        })
    })
   // console.log('archivo inicial')
   // console.log(this.archivo)
  }

  public createDocente(): void {
    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term');
      if (username) {
        this.docenteService.crearPorUsuarioUsername(this.docentes, username).subscribe(docente => {
        //  console.log(docente + 'docente creado');
          Swal.fire('Crear docente', `Docente ${docente.nombre} creado con exito`, 'success')
          this.tabIndex = 1
          this.router.navigate([`/home`]);
        })
      }
    })
  }

  seleccionarArchivo(event) {
    this.archivoSelected = event.target.files[0]
   // console.log(this.archivoSelected)
    if (this.archivoSelected == null) {
      Swal.fire('Upload?: ', 'No selecciono nada', 'question');
    } else {
      if (
        this.archivoSelected.type.indexOf('application/vnd.openxmlformats-officedocument.word') >= 0) {
        Swal.fire('Success Upload: ', 'Archivo seleccionado', 'success');
        this.archivo.tipo = 'WORD'
     //   console.log('condicion word')
     //   console.log(this.archivo)
      }
      else if (this.archivoSelected.type.indexOf('application/pdf') >= 0) {
        Swal.fire('Success Upload: ', 'Archivo seleccionado', 'success');
        this.archivo.tipo = 'PDF'
      //  console.log('condicion pdf')
      //  console.log(this.archivo)
      }
      else if (this.archivoSelected.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') >= 0) {
        Swal.fire('Success Upload: ', 'Archivo seleccionado', 'success');
        this.archivo.tipo = 'EXCEL'
        //console.log('condicion excel')
        //console.log(this.archivo)
      } else {
        Swal.fire('Error Upload: ', 'Debe seleccionar un archivo tipo pdf,word o excel', 'error');
        this.archivoSelected = null
       // console.log('No es pdf word o excel')
      }
    }
  }

  subirArchivo() {
    if (!this.archivoSelected) {
      Swal.fire('Error Upload: ', 'Debe seleccionar un archivo', 'error');
    } else {
     /* console.log('Imprimiendo alumno, usuario y archivo')
      console.log(this.usuario)
      console.log(this.archivo)
      console.log(this.archivoSelected)
*/
      this.docenteService.crearConArchivo(this.archivo, this.archivoSelected, this.docente.id)
        .subscribe(a => {
          this.archivo = a
          this.archivo.id = 50
      //    console.log(a)
          this.tabIndex = 3
          this.router.navigate([`/docentes/form/docente-perfil/${this.docente.id}`]);
          Swal.fire('Upload File', 'El archivo docente se subio correctamente', 'success')
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
    }
  }

  mostrarArchivos() {
    if(this.docente === undefined) {
      Swal.fire('Precauscion', 'No existe usuario asociado a un docente', 'warning')
    } else {
      this.usuario = this.docente.usuario
      //console.log(this.usuario)
      this.docenteService.filtrarArchivosByUsuarioId(this.usuario.id).subscribe(au => { // au = archivo-usuario
        this.archivos = au
    //    console.log(au.id < 0)
      })
    }
  }

  redireccion(archivo: Archivo) {
  //  console.log('redireccion')
  //  console.log(archivo)
    if (archivo.tipo === 'PDF') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-pdf/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'WORD') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-word/${archivo.id}`, "_blank")
    }

    if (archivo.tipo === 'EXCEL') {
      window.open(`${this.urlBackend}/api/archivos/uploads/file-excel/${archivo.id}`, "_blank")
    }
  }

  public eliminar(archivo: Archivo): void {

    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.archivoService.eliminar(archivo.id).subscribe(() => {
          // this.listar = this.listar.filter(a => a !== e);
          Swal.fire('Eliminado:', `${this.archivo.nombre} eliminado con éxito`, 'success');
          this.tabIndex = 2
          this.router.navigate([`/docentes/form/docente-perfil/${this.docente.id}`]);
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
      }
    });

  }

  public editar(): void {
    this.docenteService.editar(this.docente).subscribe(m => {
   //   console.log(m);
      Swal.fire('Modificado:', `${this.docente.nombre} actualizado con éxito`, 'success');
      this.router.navigate([`/docentes/form/docente-perfil/${this.usuario.username}`]);
    }, err => {
      if (err.status === 400 || err.status === 405) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

}

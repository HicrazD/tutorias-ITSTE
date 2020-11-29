import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from 'src/app/models/archivo';
import { Docente } from 'src/app/models/docente';
import { Usuario } from 'src/app/models/usuario';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente-perfil',
  templateUrl: './docente-perfil.component.html',
  styleUrls: ['./docente-perfil.component.css']
})
export class DocentePerfilComponent implements OnInit {
  usuario: Usuario
  docentes: Docente = new Docente()
  docente: Docente

  tabIndex = 0;

  archivo: Archivo = new Archivo()
  archivoSelected: File
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private docenteService: DocenteService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.usuarioService.filtrarUsernambre(username).subscribe(u => {
          console.log(u)
          this.usuario = u
        })
    })

    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term')
      if (username)
        this.docenteService.filtrarPorUsuarioUsername(username).subscribe(a => {
          console.log(a)
          if (a)
            this.docente = a
        })
    })
  }

  public createDocente(): void {
    this.route.paramMap.subscribe(params => {
      const username: string = params.get('term');
      if (username) {
        this.docenteService.crearPorUsuarioUsername(this.docentes, username).subscribe(docente => {
          console.log(docente + 'docente creado');
          alert(`Docente ${docente.nombre} creado con exito`);
          this.router.navigate(['/docentes']);
        })
      }
    })
  }

  seleccionarArchivo(event) {
    this.archivoSelected = event.target.files[0]
    console.log(this.archivoSelected)
  }

  subirArchivo() {
    if (!this.archivoSelected) {
      Swal.fire('Error Upload: ', 'Debe seleccionar un archivo', 'error');
    } else {
      console.log('Imprimiendo alumno, usuario y archivo')
      console.log(this.usuario)
      console.log(this.archivo)
      console.log(this.archivoSelected)

      this.docenteService.crearConArchivo(this.archivo, this.archivoSelected, this.docente.id)
        .subscribe(a => {
          this.archivo = a
          console.log(a + "se supone k esto es el archivo")
          Swal.fire('El archivo docente se subio correctamente creo', `mi pana`)
        });

    }
  }

}

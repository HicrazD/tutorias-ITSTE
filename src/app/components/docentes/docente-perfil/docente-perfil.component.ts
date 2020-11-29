import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/app/models/docente';
import { Usuario } from 'src/app/models/usuario';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private route: ActivatedRoute,
    private router:Router,
    private docenteService: DocenteService,
    private usuarioService:UsuarioService) { }

    ngOnInit(){
     
      this.route.paramMap.subscribe(params =>{
        const username:string = params.get('term')
        if(username)
        this.usuarioService.filtrarUsernambre(username).subscribe(u =>{
          console.log(u)
          this.usuario = u
          })
      })

      this.route.paramMap.subscribe(params =>{
        const username:string = params.get('term')
        if(username)
        this.docenteService.filtrarPorUsuarioUsername(username).subscribe(a =>{
          console.log(a)
          if(a)
          this.docente = a
          })
      })
    }

    public createDocente():void{    
      this.route.paramMap.subscribe(params => {
        const username: string = params.get('term');
        if(username){
            this.docenteService.crearPorUsuarioUsername(this.docentes,username).subscribe(docente =>{
              console.log(docente);
              alert(`Docente ${docente.nombre} creado con exito`);
              this.router.navigate(['/docentes']);})
        }
      })
        }

}

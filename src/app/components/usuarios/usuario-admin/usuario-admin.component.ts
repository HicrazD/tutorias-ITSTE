import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.css']
})
export class UsuarioAdminComponent implements OnInit {

  codigo:string = 'xtr92%ITSTE.'
  codigo2:string = '$%rolesdzc#&.'
  titulo:string = 'Administrador'
  endPoint:string = 'ROLE_ADMIN'
  hide = true;
  error: any;
  role:Roles[] 
  codigoRol:boolean = true
  constructor(private router:Router,private service:RoleService,private roleService: RoleService) { }
  
  ngOnInit(): void {
    this.roleService.listar().subscribe(r => this.role = r)
  }

  fieldCodigo(code: string) {
    code = code !== undefined ? code.trim() : '';
    if (code === this.codigo) {
      console.log(code)
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Codigo Correcto!',
      })
      this.router.navigate(['/usuarios/form/crear/usuario-admin/secret/2de6/'+this.endPoint])
  }
}

fieldCodigo2(code: string) {
    code = code !== undefined ? code.trim() : '';
    if (code === this.codigo2) {
      console.log(code)
      this.codigoRol = false
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Codigo Correcto!',
      })
  }
}

create(){
this.roleService.crearRoles().subscribe(()=>{},
  err => {
  if (err.status == 400) {
    this.error = err.error;
    console.log(this.error);
  }

  if (err.status == 500) {
    this.error = err.error;
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'No puedes crear mas roles!',
    })
    console.log(this.error);
  }
})
Swal.fire({
  icon: 'success',
  title: 'Exito!',
  text: 'Roles Creados!',
})
}
}

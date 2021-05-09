import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Codigo } from 'src/app/models/codigo';
import { Roles } from 'src/app/models/roles';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CodigoService } from 'src/app/services/codigo.service';
import { RoleService } from 'src/app/services/role.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

interface Tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.css']
})
export class UsuarioAdminComponent implements OnInit {
  code: Codigo
  codigosDb: Codigo[] = []
  codigo: string = 'xtr92%ITSTE.'
  codigo2: string = '$%rolesdzc#&.'
  titulo: string = 'Administrador'
  endPoint: string = 'ROLE_ADMIN'
  hide = true;
  hide1 = true;
  hide2 = true;
  error: any;
  role: Roles[]
  codigoRol: boolean = true
  usuario: Usuario;
  usuarioDb: Usuario
  userContra: Usuario
  newContr: string
  tipos: Tipo[] = [
    { value: 'DOCENTE', viewValue: 'DOCENTE' },
    { value: 'ALUMNO', viewValue: 'ALUMNO' }
  ];

  displayedColumns: string[] = ['codigo', 'tipo', 'eliminar'];

  dataSource: MatTableDataSource<Codigo>;
  constructor(private router: Router, public authService: AuthService,
    private roleService: RoleService, private usuarioService: UsuarioService,
    private codigoService: CodigoService, private route: ActivatedRoute) {
    this.code = new Codigo()
    this.codigosDb = []
    this.usuario = new Usuario()
    this.userContra = new Usuario()
  }

  ngOnInit(): void {
    this.roleService.listar().subscribe(r => this.role = r)
    this.listarCodigos()
    
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id')
      if (id)
        this.usuarioService.ver(id).subscribe(u => {
          this.usuarioDb = u
        })
    })

  }

  listarCodigos(){
    this.codigoService.listar().subscribe(codigo => {
      this.codigosDb = codigo
      //this.updateData()
    })
  }
  acceso(){
    if(this.authService.hasRole('ROLE_ADMIN')) return true
    else return false
  }

  updateData(){
    this.dataSource = new MatTableDataSource<Codigo>(this.codigosDb);
  }
  editarUsuario(contra: string, nuevaContra: string): void {
    if (contra === nuevaContra) {
      this.usuarioDb.password = nuevaContra
      this.usuarioService.editar(this.usuarioDb).subscribe(m => {
        //console.log(m);
        Swal.fire('Modificado:', `Usuario actualizado con éxito`, 'success');
        this.router.navigate(['/home']);
      }, err => {
        if (err.status === 400 || err.status === 500) {
          this.error = err.error;
          console.log(this.error);
        }
      });

    }
  }
  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource<Codigo>(this.codigosDb);
   //this.updateData()
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  createCode() {
    if (this.code.tipo === null || this.code.tipo === undefined) {
      Swal.fire('Campo Vacio', 'El campo esta vacio', 'warning')
    } else {
      this.codigoService.create(this.code).subscribe(c => {
        this.listarCodigos()
        //this.updateData()
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: `Codigo Creado! : [${c.tipo}]`,
        })
      }, err => {
        if (err.status == 400) {
          this.error = err.error;
          Swal.fire({
            icon: 'error',
            title: 'Oh no!',
            text: `La operacion no se pudo acompletar!`,
          })
          //console.log(this.error);
        }
      }
      )

    }
  }
  create() {
    this.roleService.crearRoles().subscribe(r => {
      this.roleService.listar().subscribe(r => this.role = r)
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Roles Creados!',
      })
    },
      err => {
        if (err.status == 400) {
          this.error = err.error;
        //  console.log(this.error);
        }

        if (err.status == 500) {
          this.error = err.error;
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No puedes crear mas roles!',
          })
         // console.log(this.error);
        }
      })
  }

  exportexcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.codigosDb)
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    FileSaver.saveAs(data, 'Codigos' + '_export_' + '.xlsx')
  }

  public eliminar(codigo: Codigo): void {

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
        this.codigoService.eliminar(codigo.id).subscribe(() => {
          // this.listar = this.listar.filter(a => a !== e);
          
          this.listarCodigos()
          Swal.fire('Eliminado:', `Codigo eliminado con éxito`, 'success');
        }, err => {
          if (err.status == 400) {
            this.error = err.error;
            Swal.fire('Oops...:', `No se completo la peticion`, 'error');
           // console.log(this.error);
          }

          if (err.status == 500) {
            this.error = err.error;
            Swal.fire('Oops...:500', `Problemas en el servidor, Contactar al servio técnico`, 'error');
            //console.log(this.error);
          }
        });
      }
    });

  }
}

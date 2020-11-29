import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoPerfilComponent } from './components/alumnos/alumno-perfil/alumno-perfil.component';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form/alumnos-form.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ArchivosFormComponent } from './components/archivos/archivos-form/archivos-form.component';
import { ArchivosComponent } from './components/archivos/archivos/archivos.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { AsignarAlumnosComponent } from './components/docentes/asignar-alumnos/asignar-alumnos.component';
import { DocenteFormComponent } from './components/docentes/docente-form/docente-form.component';
import { DocentePerfilComponent } from './components/docentes/docente-perfil/docente-perfil.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RolUsuarioComponent } from './components/usuarios/rol-usuario/rol-usuario.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component:HomeComponent},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form/:id', component:AlumnosFormComponent},
  {path: 'alumnos/form/alumno-perfil/:term', component: AlumnoPerfilComponent},  
  {path: 'docentes/asignar-alumnos/:id', component: AsignarAlumnosComponent},
  {path: 'docentes', component: DocentesComponent},
  {path: 'docentes/form/docente-perfil/:term',component:DocentePerfilComponent},
  {path: 'docentes/form/docente-archivo/:id',component:DocenteFormComponent},
  {path: 'archivos', component: ArchivosComponent},
  {path: 'archivos/form', component: ArchivosFormComponent},
  {path: 'archivos/form/:id', component: ArchivosFormComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/crear/:id',component:UsuariosFormComponent},
  {path: 'rol-usuario', component: RolUsuarioComponent},
  {path: 'consultas', component:ConsultasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

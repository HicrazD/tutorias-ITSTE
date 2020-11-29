import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoPerfilComponent } from './components/alumnos/alumno-perfil/alumno-perfil.component';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form/alumnos-form.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AsignarAlumnosComponent } from './components/docentes/asignar-alumnos/asignar-alumnos.component';
import { DocentePerfilComponent } from './components/docentes/docente-perfil/docente-perfil.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RolUsuarioComponent } from './components/usuarios/rol-usuario/rol-usuario.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'alumnos'},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form/:id', component:AlumnosFormComponent},
  {path: 'alumnos/form/alumno-perfil/:term', component: AlumnoPerfilComponent},
  {path: 'docentes', component: DocentesComponent},
  {path: 'docentes/asignar-alumnos/:id', component: AsignarAlumnosComponent},
  {path: 'docentes/form/docente-perfil/:term',component:DocentePerfilComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/crear/:id',component:UsuariosFormComponent},
  {path: 'rol-usuario', component: RolUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

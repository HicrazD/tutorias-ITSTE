import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoPerfilComponent } from './components/alumnos/alumno-perfil/alumno-perfil.component';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form/alumnos-form.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen/responder-examen.component';
import { ArchivosFormComponent } from './components/archivos/archivos-form/archivos-form.component';
import { ArchivosComponent } from './components/archivos/archivos/archivos.component';
import { AvisosFormComponent } from './components/avisos/avisos-form/avisos-form.component';
import { AvisosComponent } from './components/avisos/avisos.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { AsignarAlumnosComponent } from './components/docentes/asignar-alumnos/asignar-alumnos.component';
import { AsignarExamenesComponent } from './components/docentes/asignar-examenes/asignar-examenes.component';
import { DocenteFormComponent } from './components/docentes/docente-form/docente-form.component';
import { DocentePerfilComponent } from './components/docentes/docente-perfil/docente-perfil.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { SesionesComponent } from './components/docentes/sesiones/sesiones.component';
import { ExamenesFormComponent } from './components/examenes/examenes-form/examenes-form.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { HomeComponent } from './components/home/home.component';
import { ResaComponent } from './components/reportes-plantilla/resa/resa.component';
import { SesionFomComponent } from './components/sesiones/sesion-fom/sesion-fom.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';
import { RoleGuard } from './components/usuarios/guards/role.guard';
import { LoginAdminComponent } from './components/usuarios/login-admin/login-admin.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RolUsuarioComponent } from './components/usuarios/rol-usuario/rol-usuario.component';
import { UsuarioAdminComponent } from './components/usuarios/usuario-admin/usuario-admin.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component:HomeComponent},
  {path: 'alumnos', component: AlumnosComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  {path: 'alumnos/form/:id', component:AlumnosFormComponent},
  {path: 'alumnos/responder-examen/:id', component:ResponderExamenComponent}, //id student
  {path: 'alumnos/form/alumno-perfil/:term', component: AlumnoPerfilComponent},  
  {path: 'docentes/asignar-alumnos/:id', component: AsignarAlumnosComponent},
  {path: 'docentes', component: DocentesComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  {path: 'docentes/form/docente-perfil/:term',component:DocentePerfilComponent},
  {path: 'docentes/form/docente-archivo/:id',component:DocenteFormComponent},
  {path: 'archivos', component: ArchivosComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  {path: 'archivos/form', component: ArchivosFormComponent,data: { role: 'ROLE_ADMIN' }},
  {path: 'archivos/form/:id', component: ArchivosFormComponent,data: { role: 'ROLE_ADMIN' }},
  {path: 'usuarios', component: UsuariosComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios/form/crear',component:UsuariosFormComponent},
  {path: 'usuarios/form/crear/usuario-admin/secret/2de6',component:LoginAdminComponent},
  {path: 'usuarios/url-secret/lvb4/admin/itste',component:UsuarioAdminComponent},// ir primero si eres Admin
  {path: 'usuarios/url-secret/lvb4/admin/itste/:id',component:UsuarioAdminComponent},
  {path: 'rol-usuario/:id', component: RolUsuarioComponent},
  {path: 'consultas', component:ConsultasComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_DOCENTE' }},
  {path: 'examenes/asignar-examenes/:id', component: AsignarExamenesComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},// id docente
  {path: 'examenes/asignar-examenes', component: AsignarExamenesComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'examenes/form/:id', component:ExamenesFormComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'examenes/form', component:ExamenesFormComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'examenes', component:ExamenesComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'reportes/resa',component:ResaComponent},
  {path: 'sesiones/form',component:SesionFomComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_DOCENTE' }},
  {path: 'sesiones/form/:id',component:SesionFomComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_DOCENTE' }},
  {path: 'sesiones-ver/:term', component: SesionesComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_DOCENTE' }},
  {path: 'avisos/form/noticia',component:AvisosFormComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'avisos/form/noticia/:id',component:AvisosFormComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_ADMIN' }},
  {path: 'avisos/list',component:AvisosComponent,canActivate: [AuthGuard, RoleGuard],data: { role: 'ROLE_DOCENTE' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

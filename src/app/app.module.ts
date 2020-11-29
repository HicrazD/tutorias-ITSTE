import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './components/usuarios/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form/alumnos-form.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { RolUsuarioComponent } from './components/usuarios/rol-usuario/rol-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AsignarAlumnosComponent } from './components/docentes/asignar-alumnos/asignar-alumnos.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AlumnoPerfilComponent } from './components/alumnos/alumno-perfil/alumno-perfil.component';
import { DocentePerfilComponent } from './components/docentes/docente-perfil/docente-perfil.component';
import { DocenteFormComponent } from './components/docentes/docente-form/docente-form.component';
import { ArchivosComponent } from './components/archivos/archivos/archivos.component';
import { ArchivosFormComponent } from './components/archivos/archivos-form/archivos-form.component';
import { HomeComponent } from './components/home/home.component';
import { ConsultasComponent } from './components/consultas/consultas.component';


@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    DocentesComponent,
    UsuariosComponent,
    LoginComponent,
    AlumnosFormComponent,
    UsuariosFormComponent,
    RolUsuarioComponent,
    AsignarAlumnosComponent,
    AlumnoPerfilComponent,
    DocentePerfilComponent,
    DocenteFormComponent,
    ArchivosComponent,
    ArchivosFormComponent,
    HomeComponent,
    ConsultasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatProgressBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

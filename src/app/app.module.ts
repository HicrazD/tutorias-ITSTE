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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form/alumnos-form.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { RolUsuarioComponent } from './components/usuarios/rol-usuario/rol-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsignarAlumnosComponent } from './components/docentes/asignar-alumnos/asignar-alumnos.component';
import { AlumnoPerfilComponent } from './components/alumnos/alumno-perfil/alumno-perfil.component';
import { DocentePerfilComponent } from './components/docentes/docente-perfil/docente-perfil.component';
import { DocenteFormComponent } from './components/docentes/docente-form/docente-form.component';
import { ArchivosComponent } from './components/archivos/archivos/archivos.component';
import { ArchivosFormComponent } from './components/archivos/archivos-form/archivos-form.component';
import { HomeComponent } from './components/home/home.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { UsuarioAdminComponent } from './components/usuarios/usuario-admin/usuario-admin.component';
import { TokenInterceptor } from './components/usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './components/usuarios/interceptors/auth.interceptor';
import { LoginAdminComponent } from './components/usuarios/login-admin/login-admin.component';
import { SliderComponent } from './components/slider/slider.component';
import { AsignarExamenesComponent } from './components/docentes/asignar-examenes/asignar-examenes.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { ExamenesFormComponent } from './components/examenes/examenes-form/examenes-form.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen/responder-examen.component';

import { MatIconModule } from "@angular/material/icon";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import { ResponderExamenModalComponent } from './components/alumnos/responder-examen-modal/responder-examen-modal.component';
import { VerExamenModalComponent } from './components/alumnos/ver-examen-modal/ver-examen-modal.component';
import { FooterComponent } from './footer/footer.component';




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
    UsuarioAdminComponent,
    LoginAdminComponent,
    SliderComponent,
    AsignarExamenesComponent,
    ExamenesComponent,
    ExamenesFormComponent,
    ResponderExamenComponent,
    ResponderExamenModalComponent,
    VerExamenModalComponent,
    FooterComponent,
  ],
  entryComponents: [ResponderExamenModalComponent,VerExamenModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { AsignarExamenesComponent } from './components/docentes/asignar-examenes/asignar-examenes.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { ExamenesFormComponent } from './components/examenes/examenes-form/examenes-form.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen/responder-examen.component';
import { ResponderExamenModalComponent } from './components/alumnos/responder-examen-modal/responder-examen-modal.component';
import { VerExamenModalComponent } from './components/alumnos/ver-examen-modal/ver-examen-modal.component';
import { FooterComponent } from './footer/footer.component';
import { VerResultadosModalComponent } from './components/docentes/ver-resultados-modal/ver-resultados-modal.component';
import { FooterResportesComponent } from './footer/footer-resportes/footer-resportes.component';
import { HeaderComponent } from './components/reportes-plantilla/header/header.component';
import { ResaComponent } from './components/reportes-plantilla/resa/resa.component';
import { InformeAsistenciasComponent } from './components/reportes-plantilla/informe-asistencias/informe-asistencias.component';
import { SesionFomComponent } from './components/sesiones/sesion-fom/sesion-fom.component';
import { SesionesComponent } from './components/docentes/sesiones/sesiones.component';
import { PatComponent } from './components/reportes-plantilla/pat/pat.component';
import { AsistenciasModelComponent } from './components/asistencias/asistencias-model/asistencias-model.component';
import { AvisosComponent } from './components/avisos/avisos.component';
import { AvisosFormComponent } from './components/avisos/avisos-form/avisos-form.component';
import { HojaCanalizacionComponent } from './components/reportes-plantilla/hoja-canalizacion/hoja-canalizacion.component';
import { ReacComponent } from './components/reportes-plantilla/reac/reac.component';
import { UformularioAlumnoComponent } from './components/usuarios/usuarios-form/uformulario-alumno/uformulario-alumno.component';
import { UformularioDocenteComponent } from './components/usuarios/usuarios-form/uformulario-docente/uformulario-docente.component';

import {MatRadioModule} from '@angular/material/radio';
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { registerLocaleData } from '@angular/common';
import LocaleES from '@angular/common/locales/es';

registerLocaleData(LocaleES,'es');


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
    AsignarExamenesComponent,
    ExamenesComponent,
    ExamenesFormComponent,
    ResponderExamenComponent,
    ResponderExamenModalComponent,
    VerExamenModalComponent,
    FooterComponent,
    VerResultadosModalComponent,
    FooterResportesComponent,
    HeaderComponent,
    ResaComponent,
    InformeAsistenciasComponent,
    SesionFomComponent,
    SesionesComponent,
    PatComponent,
    AsistenciasModelComponent,
    AvisosComponent,
    AvisosFormComponent,
    HojaCanalizacionComponent,
    ReacComponent,
    UformularioAlumnoComponent,
    UformularioDocenteComponent
  ],
  entryComponents: [ResponderExamenModalComponent,
    VerExamenModalComponent,
    VerResultadosModalComponent,
    InformeAsistenciasComponent,
    PatComponent,
    AsistenciasModelComponent,
    HojaCanalizacionComponent],
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
    MatGridListModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatRadioModule,
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosRoutingModule } from './alumnos-routing.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AlumnosComponent } from './alumnos.component';
import { AlumnoPerfilComponent } from './alumno-perfil/alumno-perfil.component';
import { AlumnosFormComponent } from './alumnos-form/alumnos-form.component';
import { ResponderExamenComponent } from './responder-examen/responder-examen.component';
import { ResponderExamenModalComponent } from './responder-examen-modal/responder-examen-modal.component';
import { VerExamenModalComponent } from './ver-examen-modal/ver-examen-modal.component';

import { registerLocaleData } from '@angular/common';
import LocaleES from '@angular/common/locales/es';
import { TokenInterceptor } from '../usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from '../usuarios/interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(LocaleES,'es');

@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnoPerfilComponent,
    AlumnosFormComponent,
    ResponderExamenComponent,
    ResponderExamenModalComponent,
    VerExamenModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AlumnosRoutingModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class AlumnosModule { }

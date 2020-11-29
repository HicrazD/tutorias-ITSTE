import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoPerfilComponent } from './alumno-perfil.component';

describe('AlumnoPerfilComponent', () => {
  let component: AlumnoPerfilComponent;
  let fixture: ComponentFixture<AlumnoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

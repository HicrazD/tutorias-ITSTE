import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UformularioAlumnoComponent } from './uformulario-alumno.component';

describe('UformularioAlumnoComponent', () => {
  let component: UformularioAlumnoComponent;
  let fixture: ComponentFixture<UformularioAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UformularioAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UformularioAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

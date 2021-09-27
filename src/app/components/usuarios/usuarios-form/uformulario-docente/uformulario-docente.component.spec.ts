import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UformularioDocenteComponent } from './uformulario-docente.component';

describe('UformularioDocenteComponent', () => {
  let component: UformularioDocenteComponent;
  let fixture: ComponentFixture<UformularioDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UformularioDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UformularioDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

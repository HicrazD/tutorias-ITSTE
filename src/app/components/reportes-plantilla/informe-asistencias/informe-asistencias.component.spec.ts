import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeAsistenciasComponent } from './informe-asistencias.component';

describe('InformeAsistenciasComponent', () => {
  let component: InformeAsistenciasComponent;
  let fixture: ComponentFixture<InformeAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeAsistenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

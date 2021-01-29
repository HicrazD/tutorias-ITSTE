import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasModelComponent } from './asistencias-model.component';

describe('AsistenciasModelComponent', () => {
  let component: AsistenciasModelComponent;
  let fixture: ComponentFixture<AsistenciasModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciasModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

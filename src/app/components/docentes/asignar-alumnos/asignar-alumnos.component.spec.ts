import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAlumnosComponent } from './asignar-alumnos.component';

describe('AsignarAlumnosComponent', () => {
  let component: AsignarAlumnosComponent;
  let fixture: ComponentFixture<AsignarAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

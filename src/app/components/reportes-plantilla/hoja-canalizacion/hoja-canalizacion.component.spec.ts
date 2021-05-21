import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaCanalizacionComponent } from './hoja-canalizacion.component';

describe('HojaCanalizacionComponent', () => {
  let component: HojaCanalizacionComponent;
  let fixture: ComponentFixture<HojaCanalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HojaCanalizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HojaCanalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

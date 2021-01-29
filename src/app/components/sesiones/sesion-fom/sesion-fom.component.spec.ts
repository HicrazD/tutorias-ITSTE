import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionFomComponent } from './sesion-fom.component';

describe('SesionFomComponent', () => {
  let component: SesionFomComponent;
  let fixture: ComponentFixture<SesionFomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionFomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionFomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

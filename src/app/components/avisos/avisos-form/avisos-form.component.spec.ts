import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosFormComponent } from './avisos-form.component';

describe('AvisosFormComponent', () => {
  let component: AvisosFormComponent;
  let fixture: ComponentFixture<AvisosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

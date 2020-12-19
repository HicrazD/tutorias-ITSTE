import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerExamenModalComponent } from './ver-examen-modal.component';

describe('VerExamenModalComponent', () => {
  let component: VerExamenModalComponent;
  let fixture: ComponentFixture<VerExamenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerExamenModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerExamenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

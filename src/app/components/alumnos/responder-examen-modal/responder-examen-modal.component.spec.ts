import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderExamenModalComponent } from './responder-examen-modal.component';

describe('ResponderExamenModalComponent', () => {
  let component: ResponderExamenModalComponent;
  let fixture: ComponentFixture<ResponderExamenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderExamenModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderExamenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderExamenComponent } from './responder-examen.component';

describe('ResponderExamenComponent', () => {
  let component: ResponderExamenComponent;
  let fixture: ComponentFixture<ResponderExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

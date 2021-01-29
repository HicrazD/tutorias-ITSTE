import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatComponent } from './pat.component';

describe('PatComponent', () => {
  let component: PatComponent;
  let fixture: ComponentFixture<PatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

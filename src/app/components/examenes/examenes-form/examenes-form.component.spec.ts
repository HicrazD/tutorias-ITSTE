import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesFormComponent } from './examenes-form.component';

describe('ExamenesFormComponent', () => {
  let component: ExamenesFormComponent;
  let fixture: ComponentFixture<ExamenesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

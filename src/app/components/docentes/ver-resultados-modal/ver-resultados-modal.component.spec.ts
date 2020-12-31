import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResultadosModalComponent } from './ver-resultados-modal.component';

describe('VerResultadosModalComponent', () => {
  let component: VerResultadosModalComponent;
  let fixture: ComponentFixture<VerResultadosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerResultadosModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerResultadosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

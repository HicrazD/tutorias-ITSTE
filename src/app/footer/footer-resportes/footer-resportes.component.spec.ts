import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterResportesComponent } from './footer-resportes.component';

describe('FooterResportesComponent', () => {
  let component: FooterResportesComponent;
  let fixture: ComponentFixture<FooterResportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterResportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterResportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReacComponent } from './reac.component';

describe('ReacComponent', () => {
  let component: ReacComponent;
  let fixture: ComponentFixture<ReacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

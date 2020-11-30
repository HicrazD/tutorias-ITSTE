import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosFormComponent } from './archivos-form.component';

describe('ArchivosFormComponent', () => {
  let component: ArchivosFormComponent;
  let fixture: ComponentFixture<ArchivosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

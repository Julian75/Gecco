import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaSolicitudesComponent } from './escala-solicitudes.component';

describe('EscalaSolicitudesComponent', () => {
  let component: EscalaSolicitudesComponent;
  let fixture: ComponentFixture<EscalaSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalaSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

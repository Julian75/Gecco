import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEscalaSolicitudesComponent } from './agregar-escala-solicitudes.component';

describe('AgregarEscalaSolicitudesComponent', () => {
  let component: AgregarEscalaSolicitudesComponent;
  let fixture: ComponentFixture<AgregarEscalaSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEscalaSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEscalaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

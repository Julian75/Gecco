import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHistorialSolicitudesComponent } from './agregar-historial-solicitudes.component';

describe('AgregarHistorialSolicitudesComponent', () => {
  let component: AgregarHistorialSolicitudesComponent;
  let fixture: ComponentFixture<AgregarHistorialSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHistorialSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHistorialSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

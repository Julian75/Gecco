import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudArticulosBajaComponent } from './solicitud-articulos-baja.component';

describe('SolicitudArticulosBajaComponent', () => {
  let component: SolicitudArticulosBajaComponent;
  let fixture: ComponentFixture<SolicitudArticulosBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudArticulosBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudArticulosBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSolicitudBajaArticuloComponent } from './agregar-solicitud-baja-articulo.component';

describe('AgregarSolicitudBajaArticuloComponent', () => {
  let component: AgregarSolicitudBajaArticuloComponent;
  let fixture: ComponentFixture<AgregarSolicitudBajaArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSolicitudBajaArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSolicitudBajaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

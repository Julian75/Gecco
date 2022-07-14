import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEliminarTurnoVendedorComponent } from './solicitud-eliminar-turno-vendedor.component';

describe('SolicitudEliminarTurnoVendedorComponent', () => {
  let component: SolicitudEliminarTurnoVendedorComponent;
  let fixture: ComponentFixture<SolicitudEliminarTurnoVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudEliminarTurnoVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudEliminarTurnoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

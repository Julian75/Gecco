import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAsignarPuntoVentaArticuloComponent } from './agregar-asignar-punto-venta-articulo.component';

describe('AgregarAsignarPuntoVentaArticuloComponent', () => {
  let component: AgregarAsignarPuntoVentaArticuloComponent;
  let fixture: ComponentFixture<AgregarAsignarPuntoVentaArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAsignarPuntoVentaArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAsignarPuntoVentaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

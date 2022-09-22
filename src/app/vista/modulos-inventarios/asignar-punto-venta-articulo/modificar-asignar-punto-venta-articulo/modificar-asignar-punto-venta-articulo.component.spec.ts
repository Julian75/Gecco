import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAsignarPuntoVentaArticuloComponent } from './modificar-asignar-punto-venta-articulo.component';

describe('ModificarAsignarPuntoVentaArticuloComponent', () => {
  let component: ModificarAsignarPuntoVentaArticuloComponent;
  let fixture: ComponentFixture<ModificarAsignarPuntoVentaArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAsignarPuntoVentaArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAsignarPuntoVentaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

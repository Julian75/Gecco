import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPuntoVentaArticuloComponent } from './asignar-punto-venta-articulo.component';

describe('AsignarPuntoVentaArticuloComponent', () => {
  let component: AsignarPuntoVentaArticuloComponent;
  let fixture: ComponentFixture<AsignarPuntoVentaArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPuntoVentaArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarPuntoVentaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

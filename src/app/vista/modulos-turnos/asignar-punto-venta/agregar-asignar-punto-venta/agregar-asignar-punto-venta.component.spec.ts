import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAsignarPuntoVentaComponent } from './agregar-asignar-punto-venta.component';

describe('AgregarAsignarPuntoVentaComponent', () => {
  let component: AgregarAsignarPuntoVentaComponent;
  let fixture: ComponentFixture<AgregarAsignarPuntoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAsignarPuntoVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAsignarPuntoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

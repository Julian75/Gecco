import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPresupuestoVentaMensualComponent } from './modificar-presupuesto-venta-mensual.component';

describe('ModificarPresupuestoVentaMensualComponent', () => {
  let component: ModificarPresupuestoVentaMensualComponent;
  let fixture: ComponentFixture<ModificarPresupuestoVentaMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPresupuestoVentaMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPresupuestoVentaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

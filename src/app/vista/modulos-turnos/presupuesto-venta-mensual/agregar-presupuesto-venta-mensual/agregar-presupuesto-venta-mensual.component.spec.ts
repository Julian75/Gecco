import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPresupuestoVentaMensualComponent } from './agregar-presupuesto-venta-mensual.component';

describe('AgregarPresupuestoVentaMensualComponent', () => {
  let component: AgregarPresupuestoVentaMensualComponent;
  let fixture: ComponentFixture<AgregarPresupuestoVentaMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPresupuestoVentaMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPresupuestoVentaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

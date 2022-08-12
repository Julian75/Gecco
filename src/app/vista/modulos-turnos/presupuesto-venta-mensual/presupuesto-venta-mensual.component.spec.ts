import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoVentaMensualComponent } from './presupuesto-venta-mensual.component';

describe('PresupuestoVentaMensualComponent', () => {
  let component: PresupuestoVentaMensualComponent;
  let fixture: ComponentFixture<PresupuestoVentaMensualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresupuestoVentaMensualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresupuestoVentaMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPorcentajePresupuestoContabilidadComponent } from './agregar-porcentaje-presupuesto-contabilidad.component';

describe('AgregarPorcentajePresupuestoContabilidadComponent', () => {
  let component: AgregarPorcentajePresupuestoContabilidadComponent;
  let fixture: ComponentFixture<AgregarPorcentajePresupuestoContabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPorcentajePresupuestoContabilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPorcentajePresupuestoContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajePresupuestoComponent } from './porcentaje-presupuesto.component';

describe('PorcentajePresupuestoComponent', () => {
  let component: PorcentajePresupuestoComponent;
  let fixture: ComponentFixture<PorcentajePresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorcentajePresupuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorcentajePresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

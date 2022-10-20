import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoEjecucionMatrizDetalleComponent } from './periodo-ejecucion-matriz-detalle.component';

describe('PeriodoEjecucionMatrizDetalleComponent', () => {
  let component: PeriodoEjecucionMatrizDetalleComponent;
  let fixture: ComponentFixture<PeriodoEjecucionMatrizDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoEjecucionMatrizDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoEjecucionMatrizDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

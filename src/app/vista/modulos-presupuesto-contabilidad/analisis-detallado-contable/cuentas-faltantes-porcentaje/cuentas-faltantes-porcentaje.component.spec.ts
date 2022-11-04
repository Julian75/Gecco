import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasFaltantesPorcentajeComponent } from './cuentas-faltantes-porcentaje.component';

describe('CuentasFaltantesPorcentajeComponent', () => {
  let component: CuentasFaltantesPorcentajeComponent;
  let fixture: ComponentFixture<CuentasFaltantesPorcentajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasFaltantesPorcentajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasFaltantesPorcentajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

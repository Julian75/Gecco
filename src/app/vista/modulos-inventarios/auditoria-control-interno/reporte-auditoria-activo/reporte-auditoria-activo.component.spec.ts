import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAuditoriaActivoComponent } from './reporte-auditoria-activo.component';

describe('ReporteAuditoriaActivoComponent', () => {
  let component: ReporteAuditoriaActivoComponent;
  let fixture: ComponentFixture<ReporteAuditoriaActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAuditoriaActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteAuditoriaActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesVisitaDetalleComponent } from './reportes-visita-detalle.component';

describe('ReportesVisitaDetalleComponent', () => {
  let component: ReportesVisitaDetalleComponent;
  let fixture: ComponentFixture<ReportesVisitaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesVisitaDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesVisitaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

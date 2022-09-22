import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIngresoComponent } from './reporte-ingreso.component';

describe('ReporteIngresoComponent', () => {
  let component: ReporteIngresoComponent;
  let fixture: ComponentFixture<ReporteIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteIngresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

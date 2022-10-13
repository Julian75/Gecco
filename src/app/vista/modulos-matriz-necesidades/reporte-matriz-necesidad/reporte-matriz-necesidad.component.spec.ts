import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMatrizNecesidadComponent } from './reporte-matriz-necesidad.component';

describe('ReporteMatrizNecesidadComponent', () => {
  let component: ReporteMatrizNecesidadComponent;
  let fixture: ComponentFixture<ReporteMatrizNecesidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMatrizNecesidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteMatrizNecesidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

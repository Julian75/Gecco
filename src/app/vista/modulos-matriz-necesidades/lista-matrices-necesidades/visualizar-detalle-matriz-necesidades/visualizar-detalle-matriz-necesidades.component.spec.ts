import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDetalleMatrizNecesidadesComponent } from './visualizar-detalle-matriz-necesidades.component';

describe('VisualizarDetalleMatrizNecesidadesComponent', () => {
  let component: VisualizarDetalleMatrizNecesidadesComponent;
  let fixture: ComponentFixture<VisualizarDetalleMatrizNecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarDetalleMatrizNecesidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarDetalleMatrizNecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

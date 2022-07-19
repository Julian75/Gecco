import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDetalleSolicitudComponent } from './visualizar-detalle-solicitud.component';

describe('VisualizarDetalleSolicitudComponent', () => {
  let component: VisualizarDetalleSolicitudComponent;
  let fixture: ComponentFixture<VisualizarDetalleSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarDetalleSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarDetalleSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

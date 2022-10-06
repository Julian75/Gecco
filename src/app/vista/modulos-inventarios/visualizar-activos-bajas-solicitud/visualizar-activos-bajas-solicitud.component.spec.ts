import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarActivosBajasSolicitudComponent } from './visualizar-activos-bajas-solicitud.component';

describe('VisualizarActivosBajasSolicitudComponent', () => {
  let component: VisualizarActivosBajasSolicitudComponent;
  let fixture: ComponentFixture<VisualizarActivosBajasSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarActivosBajasSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarActivosBajasSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarHistorialArticuloComponent } from './visualizar-historial-articulo.component';

describe('VisualizarHistorialArticuloComponent', () => {
  let component: VisualizarHistorialArticuloComponent;
  let fixture: ComponentFixture<VisualizarHistorialArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarHistorialArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarHistorialArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

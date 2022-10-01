import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoSolicitudBajaArticuloLiderProcesoComponent } from './rechazo-solicitud-baja-articulo-lider-proceso.component';

describe('RechazoSolicitudBajaArticuloLiderProcesoComponent', () => {
  let component: RechazoSolicitudBajaArticuloLiderProcesoComponent;
  let fixture: ComponentFixture<RechazoSolicitudBajaArticuloLiderProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazoSolicitudBajaArticuloLiderProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazoSolicitudBajaArticuloLiderProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

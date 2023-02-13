import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionRechazoSolicitudAutorizacionPremiosComponent } from './observacion-rechazo-solicitud-autorizacion-premios.component';

describe('ObservacionRechazoSolicitudAutorizacionPremiosComponent', () => {
  let component: ObservacionRechazoSolicitudAutorizacionPremiosComponent;
  let fixture: ComponentFixture<ObservacionRechazoSolicitudAutorizacionPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacionRechazoSolicitudAutorizacionPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservacionRechazoSolicitudAutorizacionPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

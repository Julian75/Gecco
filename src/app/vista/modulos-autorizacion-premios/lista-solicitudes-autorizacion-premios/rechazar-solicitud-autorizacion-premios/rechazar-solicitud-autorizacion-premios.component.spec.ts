import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarSolicitudAutorizacionPremiosComponent } from './rechazar-solicitud-autorizacion-premios.component';

describe('RechazarSolicitudAutorizacionPremiosComponent', () => {
  let component: RechazarSolicitudAutorizacionPremiosComponent;
  let fixture: ComponentFixture<RechazarSolicitudAutorizacionPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazarSolicitudAutorizacionPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazarSolicitudAutorizacionPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolicitudAutorizacionPremiosComponent } from './detalle-solicitud-autorizacion-premios.component';

describe('DetalleSolicitudAutorizacionPremiosComponent', () => {
  let component: DetalleSolicitudAutorizacionPremiosComponent;
  let fixture: ComponentFixture<DetalleSolicitudAutorizacionPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolicitudAutorizacionPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleSolicitudAutorizacionPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

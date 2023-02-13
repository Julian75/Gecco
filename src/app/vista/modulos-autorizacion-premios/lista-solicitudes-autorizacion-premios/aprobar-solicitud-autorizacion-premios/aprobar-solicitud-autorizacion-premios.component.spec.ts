import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarSolicitudAutorizacionPremiosComponent } from './aprobar-solicitud-autorizacion-premios.component';

describe('AprobarSolicitudAutorizacionPremiosComponent', () => {
  let component: AprobarSolicitudAutorizacionPremiosComponent;
  let fixture: ComponentFixture<AprobarSolicitudAutorizacionPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarSolicitudAutorizacionPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobarSolicitudAutorizacionPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

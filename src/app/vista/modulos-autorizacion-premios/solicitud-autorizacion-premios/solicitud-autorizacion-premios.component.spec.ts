import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAutorizacionPremiosComponent } from './solicitud-autorizacion-premios.component';

describe('SolicitudAutorizacionPremiosComponent', () => {
  let component: SolicitudAutorizacionPremiosComponent;
  let fixture: ComponentFixture<SolicitudAutorizacionPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudAutorizacionPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudAutorizacionPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

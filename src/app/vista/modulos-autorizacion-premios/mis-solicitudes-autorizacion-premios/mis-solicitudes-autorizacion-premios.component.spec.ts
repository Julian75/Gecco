import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSolicitudesAutorizacionPremiosComponent } from './mis-solicitudes-autorizacion-premios.component';

describe('MisSolicitudesAutorizacionPremiosComponent', () => {
  let component: MisSolicitudesAutorizacionPremiosComponent;
  let fixture: ComponentFixture<MisSolicitudesAutorizacionPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisSolicitudesAutorizacionPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisSolicitudesAutorizacionPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

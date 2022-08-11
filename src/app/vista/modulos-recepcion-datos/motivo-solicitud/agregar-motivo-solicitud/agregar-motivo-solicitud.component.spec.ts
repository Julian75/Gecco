import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMotivoSolicitudComponent } from './agregar-motivo-solicitud.component';

describe('AgregarMotivoSolicitudComponent', () => {
  let component: AgregarMotivoSolicitudComponent;
  let fixture: ComponentFixture<AgregarMotivoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMotivoSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMotivoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

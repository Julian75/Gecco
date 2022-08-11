import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMotivoSolicitudComponent } from './modificar-motivo-solicitud.component';

describe('ModificarMotivoSolicitudComponent', () => {
  let component: ModificarMotivoSolicitudComponent;
  let fixture: ComponentFixture<ModificarMotivoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMotivoSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarMotivoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoServicioComponent } from './agregar-tipo-servicio.component';

describe('AgregarTipoServicioComponent', () => {
  let component: AgregarTipoServicioComponent;
  let fixture: ComponentFixture<AgregarTipoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

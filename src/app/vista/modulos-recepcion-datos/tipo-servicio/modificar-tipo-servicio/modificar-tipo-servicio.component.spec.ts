import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoServicioComponent } from './modificar-tipo-servicio.component';

describe('ModificarTipoServicioComponent', () => {
  let component: ModificarTipoServicioComponent;
  let fixture: ComponentFixture<ModificarTipoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

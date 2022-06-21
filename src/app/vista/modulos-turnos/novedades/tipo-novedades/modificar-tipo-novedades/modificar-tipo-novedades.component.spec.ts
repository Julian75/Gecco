import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoNovedadesComponent } from './modificar-tipo-novedades.component';

describe('ModificarTipoNovedadesComponent', () => {
  let component: ModificarTipoNovedadesComponent;
  let fixture: ComponentFixture<ModificarTipoNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoNovedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTipoNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

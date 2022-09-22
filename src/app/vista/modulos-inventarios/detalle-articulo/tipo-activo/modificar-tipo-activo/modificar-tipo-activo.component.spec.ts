import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoActivoComponent } from './modificar-tipo-activo.component';

describe('ModificarTipoActivoComponent', () => {
  let component: ModificarTipoActivoComponent;
  let fixture: ComponentFixture<ModificarTipoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTipoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

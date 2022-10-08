import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoNecesidadesComponent } from './modificar-tipo-necesidades.component';

describe('ModificarTipoNecesidadesComponent', () => {
  let component: ModificarTipoNecesidadesComponent;
  let fixture: ComponentFixture<ModificarTipoNecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoNecesidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTipoNecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

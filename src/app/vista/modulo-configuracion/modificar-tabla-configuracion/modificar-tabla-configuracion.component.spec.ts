import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTablaConfiguracionComponent } from './modificar-tabla-configuracion.component';

describe('ModificarTablaConfiguracionComponent', () => {
  let component: ModificarTablaConfiguracionComponent;
  let fixture: ComponentFixture<ModificarTablaConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTablaConfiguracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTablaConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

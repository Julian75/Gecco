import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAsignarProcesoUsuarioComponent } from './modificar-asignar-proceso-usuario.component';

describe('ModificarAsignarProcesoUsuarioComponent', () => {
  let component: ModificarAsignarProcesoUsuarioComponent;
  let fixture: ComponentFixture<ModificarAsignarProcesoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAsignarProcesoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAsignarProcesoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

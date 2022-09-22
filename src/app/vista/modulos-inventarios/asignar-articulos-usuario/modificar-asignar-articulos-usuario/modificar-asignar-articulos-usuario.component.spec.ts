import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAsignarArticulosUsuarioComponent } from './modificar-asignar-articulos-usuario.component';

describe('ModificarAsignarArticulosUsuarioComponent', () => {
  let component: ModificarAsignarArticulosUsuarioComponent;
  let fixture: ComponentFixture<ModificarAsignarArticulosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAsignarArticulosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAsignarArticulosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

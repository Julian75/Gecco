import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAsignarTurnoVendedorComponent } from './modificar-asignar-turno-vendedor.component';

describe('ModificarAsignarTurnoVendedorComponent', () => {
  let component: ModificarAsignarTurnoVendedorComponent;
  let fixture: ComponentFixture<ModificarAsignarTurnoVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAsignarTurnoVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAsignarTurnoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

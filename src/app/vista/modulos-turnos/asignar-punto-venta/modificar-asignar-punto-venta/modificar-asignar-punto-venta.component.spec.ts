import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAsignarPuntoVentaComponent } from './modificar-asignar-punto-venta.component';

describe('ModificarAsignarPuntoVentaComponent', () => {
  let component: ModificarAsignarPuntoVentaComponent;
  let fixture: ComponentFixture<ModificarAsignarPuntoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAsignarPuntoVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAsignarPuntoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAsignarTurnoVendedorComponent } from './agregar-asignar-turno-vendedor.component';

describe('AgregarAsignarTurnoVendedorComponent', () => {
  let component: AgregarAsignarTurnoVendedorComponent;
  let fixture: ComponentFixture<AgregarAsignarTurnoVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAsignarTurnoVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAsignarTurnoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

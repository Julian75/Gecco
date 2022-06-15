import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTurnoVendedorComponent } from './asignar-turno-vendedor.component';

describe('AsignarTurnoVendedorComponent', () => {
  let component: AsignarTurnoVendedorComponent;
  let fixture: ComponentFixture<AsignarTurnoVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarTurnoVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarTurnoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

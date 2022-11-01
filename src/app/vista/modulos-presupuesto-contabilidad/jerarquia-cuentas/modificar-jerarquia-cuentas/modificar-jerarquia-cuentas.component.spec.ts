import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarJerarquiaCuentasComponent } from './modificar-jerarquia-cuentas.component';

describe('ModificarJerarquiaCuentasComponent', () => {
  let component: ModificarJerarquiaCuentasComponent;
  let fixture: ComponentFixture<ModificarJerarquiaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarJerarquiaCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarJerarquiaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

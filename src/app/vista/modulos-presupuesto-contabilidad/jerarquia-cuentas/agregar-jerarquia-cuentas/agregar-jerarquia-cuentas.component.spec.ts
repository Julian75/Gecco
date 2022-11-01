import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJerarquiaCuentasComponent } from './agregar-jerarquia-cuentas.component';

describe('AgregarJerarquiaCuentasComponent', () => {
  let component: AgregarJerarquiaCuentasComponent;
  let fixture: ComponentFixture<AgregarJerarquiaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarJerarquiaCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarJerarquiaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

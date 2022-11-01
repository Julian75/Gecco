import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCuentasComponent } from './modificar-cuentas.component';

describe('ModificarCuentasComponent', () => {
  let component: ModificarCuentasComponent;
  let fixture: ComponentFixture<ModificarCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

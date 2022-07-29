import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOrdenCompraComponent } from './modificar-orden-compra.component';

describe('ModificarOrdenCompraComponent', () => {
  let component: ModificarOrdenCompraComponent;
  let fixture: ComponentFixture<ModificarOrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOrdenCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

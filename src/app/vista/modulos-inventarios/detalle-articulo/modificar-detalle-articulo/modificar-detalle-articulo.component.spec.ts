import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDetalleArticuloComponent } from './modificar-detalle-articulo.component';

describe('ModificarDetalleArticuloComponent', () => {
  let component: ModificarDetalleArticuloComponent;
  let fixture: ComponentFixture<ModificarDetalleArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarDetalleArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarDetalleArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

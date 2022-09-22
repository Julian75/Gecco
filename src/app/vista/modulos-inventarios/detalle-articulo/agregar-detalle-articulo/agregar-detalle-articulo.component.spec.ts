import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDetalleArticuloComponent } from './agregar-detalle-articulo.component';

describe('AgregarDetalleArticuloComponent', () => {
  let component: AgregarDetalleArticuloComponent;
  let fixture: ComponentFixture<AgregarDetalleArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDetalleArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDetalleArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

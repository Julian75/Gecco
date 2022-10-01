import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArticulosInventarioComponent } from './agregar-articulos-inventario.component';

describe('AgregarArticulosInventarioComponent', () => {
  let component: AgregarArticulosInventarioComponent;
  let fixture: ComponentFixture<AgregarArticulosInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarArticulosInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarArticulosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

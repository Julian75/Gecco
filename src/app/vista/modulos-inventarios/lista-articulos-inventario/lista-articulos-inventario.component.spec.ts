import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArticulosInventarioComponent } from './lista-articulos-inventario.component';

describe('ListaArticulosInventarioComponent', () => {
  let component: ListaArticulosInventarioComponent;
  let fixture: ComponentFixture<ListaArticulosInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaArticulosInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaArticulosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

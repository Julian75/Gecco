import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutorizacionesBajaArticulosComponent } from './lista-autorizaciones-baja-articulos.component';

describe('ListaAutorizacionesBajaArticulosComponent', () => {
  let component: ListaAutorizacionesBajaArticulosComponent;
  let fixture: ComponentFixture<ListaAutorizacionesBajaArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAutorizacionesBajaArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAutorizacionesBajaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConfirmacionesBajaArticulosComponent } from './lista-confirmaciones-baja-articulos.component';

describe('ListaConfirmacionesBajaArticulosComponent', () => {
  let component: ListaConfirmacionesBajaArticulosComponent;
  let fixture: ComponentFixture<ListaConfirmacionesBajaArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaConfirmacionesBajaArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConfirmacionesBajaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

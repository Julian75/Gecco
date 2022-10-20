import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasPeriodosEjecucionesComponent } from './listas-periodos-ejecuciones.component';

describe('ListasPeriodosEjecucionesComponent', () => {
  let component: ListasPeriodosEjecucionesComponent;
  let fixture: ComponentFixture<ListasPeriodosEjecucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasPeriodosEjecucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasPeriodosEjecucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

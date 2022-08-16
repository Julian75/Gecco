import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCotizacionesLiderProcesoComponent } from './lista-cotizaciones-lider-proceso.component';

describe('ListaCotizacionesLiderProcesoComponent', () => {
  let component: ListaCotizacionesLiderProcesoComponent;
  let fixture: ComponentFixture<ListaCotizacionesLiderProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCotizacionesLiderProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCotizacionesLiderProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

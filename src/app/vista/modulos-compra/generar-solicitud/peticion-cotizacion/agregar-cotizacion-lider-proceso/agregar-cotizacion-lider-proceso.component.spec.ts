import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCotizacionLiderProcesoComponent } from './agregar-cotizacion-lider-proceso.component';

describe('AgregarCotizacionLiderProcesoComponent', () => {
  let component: AgregarCotizacionLiderProcesoComponent;
  let fixture: ComponentFixture<AgregarCotizacionLiderProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCotizacionLiderProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCotizacionLiderProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

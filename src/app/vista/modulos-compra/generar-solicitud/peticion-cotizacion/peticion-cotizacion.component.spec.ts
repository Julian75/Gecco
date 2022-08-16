import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionCotizacionComponent } from './peticion-cotizacion.component';

describe('PeticionCotizacionComponent', () => {
  let component: PeticionCotizacionComponent;
  let fixture: ComponentFixture<PeticionCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeticionCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeticionCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

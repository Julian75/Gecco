import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizNecesidadDetalleComponent } from './matriz-necesidad-detalle.component';

describe('MatrizNecesidadDetalleComponent', () => {
  let component: MatrizNecesidadDetalleComponent;
  let fixture: ComponentFixture<MatrizNecesidadDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizNecesidadDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrizNecesidadDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

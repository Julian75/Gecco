import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoCotizacionComponent } from './rechazo-cotizacion.component';

describe('RechazoCotizacionComponent', () => {
  let component: RechazoCotizacionComponent;
  let fixture: ComponentFixture<RechazoCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazoCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazoCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

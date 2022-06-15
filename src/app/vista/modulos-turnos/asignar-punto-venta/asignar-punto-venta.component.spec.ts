import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPuntoVentaComponent } from './asignar-punto-venta.component';

describe('AsignarPuntoVentaComponent', () => {
  let component: AsignarPuntoVentaComponent;
  let fixture: ComponentFixture<AsignarPuntoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPuntoVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarPuntoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

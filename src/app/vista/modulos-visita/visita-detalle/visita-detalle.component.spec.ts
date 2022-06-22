import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaDetalleComponent } from './visita-detalle.component';

describe('VisitaDetalleComponent', () => {
  let component: VisitaDetalleComponent;
  let fixture: ComponentFixture<VisitaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

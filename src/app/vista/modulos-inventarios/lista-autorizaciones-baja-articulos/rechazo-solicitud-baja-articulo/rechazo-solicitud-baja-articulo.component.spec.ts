import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoSolicitudBajaArticuloComponent } from './rechazo-solicitud-baja-articulo.component';

describe('RechazoSolicitudBajaArticuloComponent', () => {
  let component: RechazoSolicitudBajaArticuloComponent;
  let fixture: ComponentFixture<RechazoSolicitudBajaArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazoSolicitudBajaArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazoSolicitudBajaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

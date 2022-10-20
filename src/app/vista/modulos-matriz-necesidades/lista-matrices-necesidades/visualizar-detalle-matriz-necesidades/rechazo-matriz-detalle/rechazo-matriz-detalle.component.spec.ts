import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoMatrizDetalleComponent } from './rechazo-matriz-detalle.component';

describe('RechazoMatrizDetalleComponent', () => {
  let component: RechazoMatrizDetalleComponent;
  let fixture: ComponentFixture<RechazoMatrizDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazoMatrizDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazoMatrizDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

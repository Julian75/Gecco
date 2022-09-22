import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialArticuloComponent } from './historial-articulo.component';

describe('HistorialArticuloComponent', () => {
  let component: HistorialArticuloComponent;
  let fixture: ComponentFixture<HistorialArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

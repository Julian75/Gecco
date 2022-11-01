import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisDetalladoContableComponent } from './analisis-detallado-contable.component';

describe('AnalisisDetalladoContableComponent', () => {
  let component: AnalisisDetalladoContableComponent;
  let fixture: ComponentFixture<AnalisisDetalladoContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisDetalladoContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisDetalladoContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

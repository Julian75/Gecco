import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeContableComponent } from './porcentaje-contable.component';

describe('PorcentajeContableComponent', () => {
  let component: PorcentajeContableComponent;
  let fixture: ComponentFixture<PorcentajeContableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorcentajeContableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorcentajeContableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

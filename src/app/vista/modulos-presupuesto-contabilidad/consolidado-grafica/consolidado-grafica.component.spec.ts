import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoGraficaComponent } from './consolidado-grafica.component';

describe('ConsolidadoGraficaComponent', () => {
  let component: ConsolidadoGraficaComponent;
  let fixture: ComponentFixture<ConsolidadoGraficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidadoGraficaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidadoGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

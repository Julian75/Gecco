import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPeriodoEjecucionComponent } from './agregar-periodo-ejecucion.component';

describe('AgregarPeriodoEjecucionComponent', () => {
  let component: AgregarPeriodoEjecucionComponent;
  let fixture: ComponentFixture<AgregarPeriodoEjecucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPeriodoEjecucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPeriodoEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

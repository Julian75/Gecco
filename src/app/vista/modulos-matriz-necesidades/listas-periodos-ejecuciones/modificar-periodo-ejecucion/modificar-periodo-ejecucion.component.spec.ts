import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPeriodoEjecucionComponent } from './modificar-periodo-ejecucion.component';

describe('ModificarPeriodoEjecucionComponent', () => {
  let component: ModificarPeriodoEjecucionComponent;
  let fixture: ComponentFixture<ModificarPeriodoEjecucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPeriodoEjecucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPeriodoEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

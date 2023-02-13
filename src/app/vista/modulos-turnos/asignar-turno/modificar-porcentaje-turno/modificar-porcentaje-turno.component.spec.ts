import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPorcentajeTurnoComponent } from './modificar-porcentaje-turno.component';

describe('ModificarPorcentajeTurnoComponent', () => {
  let component: ModificarPorcentajeTurnoComponent;
  let fixture: ComponentFixture<ModificarPorcentajeTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPorcentajeTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPorcentajeTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

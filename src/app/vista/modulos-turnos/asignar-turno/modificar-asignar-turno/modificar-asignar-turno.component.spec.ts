import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAsignarTurnoComponent } from './modificar-asignar-turno.component';

describe('ModificarAsignarTurnoComponent', () => {
  let component: ModificarAsignarTurnoComponent;
  let fixture: ComponentFixture<ModificarAsignarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAsignarTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAsignarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoTurnoComponent } from './modificar-tipo-turno.component';

describe('ModificarTipoTurnoComponent', () => {
  let component: ModificarTipoTurnoComponent;
  let fixture: ComponentFixture<ModificarTipoTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTipoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

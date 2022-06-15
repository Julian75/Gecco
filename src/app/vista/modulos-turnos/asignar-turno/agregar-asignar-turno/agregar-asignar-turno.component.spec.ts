import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAsignarTurnoComponent } from './agregar-asignar-turno.component';

describe('AgregarAsignarTurnoComponent', () => {
  let component: AgregarAsignarTurnoComponent;
  let fixture: ComponentFixture<AgregarAsignarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAsignarTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAsignarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

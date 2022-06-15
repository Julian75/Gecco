import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoTurnoComponent } from './agregar-tipo-turno.component';

describe('AgregarTipoTurnoComponent', () => {
  let component: AgregarTipoTurnoComponent;
  let fixture: ComponentFixture<AgregarTipoTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

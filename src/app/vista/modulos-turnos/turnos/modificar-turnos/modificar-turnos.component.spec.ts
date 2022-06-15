import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTurnosComponent } from './modificar-turnos.component';

describe('ModificarTurnosComponent', () => {
  let component: ModificarTurnosComponent;
  let fixture: ComponentFixture<ModificarTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

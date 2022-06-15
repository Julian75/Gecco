import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTurnosComponent } from './agregar-turnos.component';

describe('AgregarTurnosComponent', () => {
  let component: AgregarTurnosComponent;
  let fixture: ComponentFixture<AgregarTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTurnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

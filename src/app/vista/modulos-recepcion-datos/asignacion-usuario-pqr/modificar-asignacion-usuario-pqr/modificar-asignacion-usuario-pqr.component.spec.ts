/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModificarAsignacionUsuarioPqrComponent } from './modificar-asignacion-usuario-pqr.component';

describe('ModificarAsignacionUsuarioPqrComponent', () => {
  let component: ModificarAsignacionUsuarioPqrComponent;
  let fixture: ComponentFixture<ModificarAsignacionUsuarioPqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarAsignacionUsuarioPqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAsignacionUsuarioPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

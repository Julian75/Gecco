/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgregarAsignacionUsuarioPqrComponent } from './agregar-asignacion-usuario-pqr.component';

describe('AgregarAsignacionUsuarioPqrComponent', () => {
  let component: AgregarAsignacionUsuarioPqrComponent;
  let fixture: ComponentFixture<AgregarAsignacionUsuarioPqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAsignacionUsuarioPqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAsignacionUsuarioPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionUsuarioPqrComponent } from './asignacion-usuario-pqr.component';

describe('AsignacionUsuarioPqrComponent', () => {
  let component: AsignacionUsuarioPqrComponent;
  let fixture: ComponentFixture<AsignacionUsuarioPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionUsuarioPqrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionUsuarioPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

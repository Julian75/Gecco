import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTurnoComponent } from './asignar-turno.component';

describe('AsignarTurnoComponent', () => {
  let component: AsignarTurnoComponent;
  let fixture: ComponentFixture<AsignarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

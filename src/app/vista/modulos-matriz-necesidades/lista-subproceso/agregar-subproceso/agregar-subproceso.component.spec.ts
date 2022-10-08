import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSubprocesoComponent } from './agregar-subproceso.component';

describe('AgregarSubprocesoComponent', () => {
  let component: AgregarSubprocesoComponent;
  let fixture: ComponentFixture<AgregarSubprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSubprocesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSubprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

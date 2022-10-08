import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSubprocesoComponent } from './modificar-subproceso.component';

describe('ModificarSubprocesoComponent', () => {
  let component: ModificarSubprocesoComponent;
  let fixture: ComponentFixture<ModificarSubprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarSubprocesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarSubprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

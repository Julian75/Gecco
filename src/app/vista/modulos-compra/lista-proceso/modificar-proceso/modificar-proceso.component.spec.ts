import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProcesoComponent } from './modificar-proceso.component';

describe('ModificarProcesoComponent', () => {
  let component: ModificarProcesoComponent;
  let fixture: ComponentFixture<ModificarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

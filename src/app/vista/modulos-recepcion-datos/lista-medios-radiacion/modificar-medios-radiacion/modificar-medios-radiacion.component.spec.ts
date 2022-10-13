import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMediosRadiacionComponent } from './modificar-medios-radiacion.component';

describe('ModificarMediosRadiacionComponent', () => {
  let component: ModificarMediosRadiacionComponent;
  let fixture: ComponentFixture<ModificarMediosRadiacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMediosRadiacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarMediosRadiacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

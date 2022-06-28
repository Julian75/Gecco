import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarNovedadesComponent } from './modificar-novedades.component';

describe('ModificarNovedadesComponent', () => {
  let component: ModificarNovedadesComponent;
  let fixture: ComponentFixture<ModificarNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarNovedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

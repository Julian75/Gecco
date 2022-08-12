import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEscalaSolicitudesComponent } from './modificar-escala-solicitudes.component';

describe('ModificarEscalaSolicitudesComponent', () => {
  let component: ModificarEscalaSolicitudesComponent;
  let fixture: ComponentFixture<ModificarEscalaSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEscalaSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEscalaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

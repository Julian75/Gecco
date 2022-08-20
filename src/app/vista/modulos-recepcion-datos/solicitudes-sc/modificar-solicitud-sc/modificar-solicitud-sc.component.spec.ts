import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSolicitudScComponent } from './modificar-solicitud-sc.component';

describe('ModificarSolicitudScComponent', () => {
  let component: ModificarSolicitudScComponent;
  let fixture: ComponentFixture<ModificarSolicitudScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarSolicitudScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarSolicitudScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOpcionesSolicitudBajasComponent } from './modificar-opciones-solicitud-bajas.component';

describe('ModificarOpcionesSolicitudBajasComponent', () => {
  let component: ModificarOpcionesSolicitudBajasComponent;
  let fixture: ComponentFixture<ModificarOpcionesSolicitudBajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOpcionesSolicitudBajasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarOpcionesSolicitudBajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

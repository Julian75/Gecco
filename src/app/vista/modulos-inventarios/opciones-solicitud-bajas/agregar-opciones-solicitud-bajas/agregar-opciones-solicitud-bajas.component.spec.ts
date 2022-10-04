import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOpcionesSolicitudBajasComponent } from './agregar-opciones-solicitud-bajas.component';

describe('AgregarOpcionesSolicitudBajasComponent', () => {
  let component: AgregarOpcionesSolicitudBajasComponent;
  let fixture: ComponentFixture<AgregarOpcionesSolicitudBajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarOpcionesSolicitudBajasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarOpcionesSolicitudBajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

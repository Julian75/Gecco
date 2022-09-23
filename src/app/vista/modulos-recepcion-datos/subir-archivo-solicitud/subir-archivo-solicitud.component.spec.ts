import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirArchivoSolicitudComponent } from './subir-archivo-solicitud.component';

describe('SubirArchivoSolicitudComponent', () => {
  let component: SubirArchivoSolicitudComponent;
  let fixture: ComponentFixture<SubirArchivoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirArchivoSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirArchivoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesSolicitudBajasComponent } from './opciones-solicitud-bajas.component';

describe('OpcionesSolicitudBajasComponent', () => {
  let component: OpcionesSolicitudBajasComponent;
  let fixture: ComponentFixture<OpcionesSolicitudBajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesSolicitudBajasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesSolicitudBajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

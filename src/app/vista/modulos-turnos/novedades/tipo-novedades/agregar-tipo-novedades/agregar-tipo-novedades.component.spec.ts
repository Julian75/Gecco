import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoNovedadesComponent } from './agregar-tipo-novedades.component';

describe('AgregarTipoNovedadesComponent', () => {
  let component: AgregarTipoNovedadesComponent;
  let fixture: ComponentFixture<AgregarTipoNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoNovedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

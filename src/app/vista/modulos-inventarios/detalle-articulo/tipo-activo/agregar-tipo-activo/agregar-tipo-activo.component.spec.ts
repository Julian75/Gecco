import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoActivoComponent } from './agregar-tipo-activo.component';

describe('AgregarTipoActivoComponent', () => {
  let component: AgregarTipoActivoComponent;
  let fixture: ComponentFixture<AgregarTipoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

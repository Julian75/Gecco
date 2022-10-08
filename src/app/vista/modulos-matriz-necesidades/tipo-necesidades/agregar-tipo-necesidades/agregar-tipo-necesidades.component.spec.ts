import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoNecesidadesComponent } from './agregar-tipo-necesidades.component';

describe('AgregarTipoNecesidadesComponent', () => {
  let component: AgregarTipoNecesidadesComponent;
  let fixture: ComponentFixture<AgregarTipoNecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoNecesidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoNecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

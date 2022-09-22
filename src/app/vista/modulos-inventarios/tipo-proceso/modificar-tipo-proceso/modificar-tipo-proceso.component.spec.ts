import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoProcesoComponent } from './modificar-tipo-proceso.component';

describe('ModificarTipoProcesoComponent', () => {
  let component: ModificarTipoProcesoComponent;
  let fixture: ComponentFixture<ModificarTipoProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTipoProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTipoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

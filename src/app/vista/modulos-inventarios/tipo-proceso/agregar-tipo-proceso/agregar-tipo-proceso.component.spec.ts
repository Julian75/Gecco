import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoProcesoComponent } from './agregar-tipo-proceso.component';

describe('AgregarTipoProcesoComponent', () => {
  let component: AgregarTipoProcesoComponent;
  let fixture: ComponentFixture<AgregarTipoProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

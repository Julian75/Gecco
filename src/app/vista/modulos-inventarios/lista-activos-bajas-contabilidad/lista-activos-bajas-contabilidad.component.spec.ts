import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaActivosBajasContabilidadComponent } from './lista-activos-bajas-contabilidad.component';

describe('ListaActivosBajasContabilidadComponent', () => {
  let component: ListaActivosBajasContabilidadComponent;
  let fixture: ComponentFixture<ListaActivosBajasContabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaActivosBajasContabilidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaActivosBajasContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

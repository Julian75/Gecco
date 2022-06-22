import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOpcionesVisitaComponent } from './modificar-opciones-visita.component';

describe('ModificarOpcionesVisitaComponent', () => {
  let component: ModificarOpcionesVisitaComponent;
  let fixture: ComponentFixture<ModificarOpcionesVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOpcionesVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarOpcionesVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

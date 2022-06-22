import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOpcionesVisitaComponent } from './agregar-opciones-visita.component';

describe('AgregarOpcionesVisitaComponent', () => {
  let component: AgregarOpcionesVisitaComponent;
  let fixture: ComponentFixture<AgregarOpcionesVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarOpcionesVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarOpcionesVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

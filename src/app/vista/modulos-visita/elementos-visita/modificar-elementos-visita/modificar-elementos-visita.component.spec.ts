import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarElementosVisitaComponent } from './modificar-elementos-visita.component';

describe('ModificarElementosVisitaComponent', () => {
  let component: ModificarElementosVisitaComponent;
  let fixture: ComponentFixture<ModificarElementosVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarElementosVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarElementosVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

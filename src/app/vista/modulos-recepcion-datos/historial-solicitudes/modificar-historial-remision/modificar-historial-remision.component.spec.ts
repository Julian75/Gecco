import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarHistorialRemisionComponent } from './modificar-historial-remision.component';

describe('ModificarHistorialRemisionComponent', () => {
  let component: ModificarHistorialRemisionComponent;
  let fixture: ComponentFixture<ModificarHistorialRemisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarHistorialRemisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarHistorialRemisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

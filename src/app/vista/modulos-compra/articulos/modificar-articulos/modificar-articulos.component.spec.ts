import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarArticulosComponent } from './modificar-articulos.component';

describe('ModificarArticulosComponent', () => {
  let component: ModificarArticulosComponent;
  let fixture: ComponentFixture<ModificarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

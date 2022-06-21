import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarJerarquiaComponent } from './modificar-jerarquia.component';

describe('ModificarJerarquiaComponent', () => {
  let component: ModificarJerarquiaComponent;
  let fixture: ComponentFixture<ModificarJerarquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarJerarquiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarJerarquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

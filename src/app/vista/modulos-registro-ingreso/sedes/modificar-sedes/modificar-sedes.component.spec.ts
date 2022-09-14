import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSedesComponent } from './modificar-sedes.component';

describe('ModificarSedesComponent', () => {
  let component: ModificarSedesComponent;
  let fixture: ComponentFixture<ModificarSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarSedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

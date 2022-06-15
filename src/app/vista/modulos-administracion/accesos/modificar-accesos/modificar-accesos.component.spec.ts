import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAccesosComponent } from './modificar-accesos.component';

describe('ModificarAccesosComponent', () => {
  let component: ModificarAccesosComponent;
  let fixture: ComponentFixture<ModificarAccesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAccesosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

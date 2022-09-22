import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAsignarProcesoUsuarioComponent } from './agregar-asignar-proceso-usuario.component';

describe('AgregarAsignarProcesoUsuarioComponent', () => {
  let component: AgregarAsignarProcesoUsuarioComponent;
  let fixture: ComponentFixture<AgregarAsignarProcesoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAsignarProcesoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAsignarProcesoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

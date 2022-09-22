import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAsignarArticulosUsuarioComponent } from './agregar-asignar-articulos-usuario.component';

describe('AgregarAsignarArticulosUsuarioComponent', () => {
  let component: AgregarAsignarArticulosUsuarioComponent;
  let fixture: ComponentFixture<AgregarAsignarArticulosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAsignarArticulosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAsignarArticulosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

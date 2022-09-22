import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarArticulosUsuarioComponent } from './asignar-articulos-usuario.component';

describe('AsignarArticulosUsuarioComponent', () => {
  let component: AsignarArticulosUsuarioComponent;
  let fixture: ComponentFixture<AsignarArticulosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarArticulosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarArticulosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

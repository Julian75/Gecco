import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarProcesoUsuarioComponent } from './asignar-proceso-usuario.component';

describe('AsignarProcesoUsuarioComponent', () => {
  let component: AsignarProcesoUsuarioComponent;
  let fixture: ComponentFixture<AsignarProcesoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarProcesoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarProcesoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

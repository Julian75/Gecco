import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConfiguracionComponent } from './agregar-configuracion.component';

describe('AgregarConfiguracionComponent', () => {
  let component: AgregarConfiguracionComponent;
  let fixture: ComponentFixture<AgregarConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarConfiguracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

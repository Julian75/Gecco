import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSolicitudScComponent } from './agregar-solicitud-sc.component';

describe('AgregarSolicitudScComponent', () => {
  let component: AgregarSolicitudScComponent;
  let fixture: ComponentFixture<AgregarSolicitudScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSolicitudScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSolicitudScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

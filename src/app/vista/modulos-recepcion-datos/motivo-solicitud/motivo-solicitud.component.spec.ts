import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoSolicitudComponent } from './motivo-solicitud.component';

describe('MotivoSolicitudComponent', () => {
  let component: MotivoSolicitudComponent;
  let fixture: ComponentFixture<MotivoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivoSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

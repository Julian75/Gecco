import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRealizadasComponent } from './solicitudes-realizadas.component';

describe('SolicitudesRealizadasComponent', () => {
  let component: SolicitudesRealizadasComponent;
  let fixture: ComponentFixture<SolicitudesRealizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesRealizadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

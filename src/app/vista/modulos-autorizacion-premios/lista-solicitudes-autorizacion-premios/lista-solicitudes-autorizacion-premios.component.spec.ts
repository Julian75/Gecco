import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolicitudesAutorizacionPremiosComponent } from './lista-solicitudes-autorizacion-premios.component';

describe('ListaSolicitudesAutorizacionPremiosComponent', () => {
  let component: ListaSolicitudesAutorizacionPremiosComponent;
  let fixture: ComponentFixture<ListaSolicitudesAutorizacionPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSolicitudesAutorizacionPremiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSolicitudesAutorizacionPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

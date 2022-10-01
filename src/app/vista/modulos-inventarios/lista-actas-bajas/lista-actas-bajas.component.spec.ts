import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaActasBajasComponent } from './lista-actas-bajas.component';

describe('ListaActasBajasComponent', () => {
  let component: ListaActasBajasComponent;
  let fixture: ComponentFixture<ListaActasBajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaActasBajasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaActasBajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

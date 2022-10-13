import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRecordatoriosComponent } from './lista-recordatorios.component';

describe('ListaRecordatoriosComponent', () => {
  let component: ListaRecordatoriosComponent;
  let fixture: ComponentFixture<ListaRecordatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRecordatoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRecordatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

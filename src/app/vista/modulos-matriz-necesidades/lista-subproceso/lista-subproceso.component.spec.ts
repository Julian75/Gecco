import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubprocesoComponent } from './lista-subproceso.component';

describe('ListaSubprocesoComponent', () => {
  let component: ListaSubprocesoComponent;
  let fixture: ComponentFixture<ListaSubprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSubprocesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSubprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

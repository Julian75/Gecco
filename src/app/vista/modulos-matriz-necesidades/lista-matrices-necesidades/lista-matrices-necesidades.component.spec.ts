import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMatricesNecesidadesComponent } from './lista-matrices-necesidades.component';

describe('ListaMatricesNecesidadesComponent', () => {
  let component: ListaMatricesNecesidadesComponent;
  let fixture: ComponentFixture<ListaMatricesNecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMatricesNecesidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMatricesNecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

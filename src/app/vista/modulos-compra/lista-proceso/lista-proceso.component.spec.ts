import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProcesoComponent } from './lista-proceso.component';

describe('ListaProcesoComponent', () => {
  let component: ListaProcesoComponent;
  let fixture: ComponentFixture<ListaProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

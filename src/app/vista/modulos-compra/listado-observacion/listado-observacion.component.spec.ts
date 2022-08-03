import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoObservacionComponent } from './listado-observacion.component';

describe('ListadoObservacionComponent', () => {
  let component: ListadoObservacionComponent;
  let fixture: ComponentFixture<ListadoObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoObservacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

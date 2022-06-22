import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesVisitaComponent } from './opciones-visita.component';

describe('OpcionesVisitaComponent', () => {
  let component: OpcionesVisitaComponent;
  let fixture: ComponentFixture<OpcionesVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

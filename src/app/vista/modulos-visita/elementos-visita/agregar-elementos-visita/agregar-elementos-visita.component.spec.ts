import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarElementosVisitaComponent } from './agregar-elementos-visita.component';

describe('AgregarElementosVisitaComponent', () => {
  let component: AgregarElementosVisitaComponent;
  let fixture: ComponentFixture<AgregarElementosVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarElementosVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarElementosVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

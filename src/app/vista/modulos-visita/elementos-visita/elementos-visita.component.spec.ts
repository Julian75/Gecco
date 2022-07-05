import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementosVisitaComponent } from './elementos-visita.component';

describe('ElementosVisitaComponent', () => {
  let component: ElementosVisitaComponent;
  let fixture: ComponentFixture<ElementosVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementosVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementosVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

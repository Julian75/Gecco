import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemisionesDecisionComponent } from './remisiones-decision.component';

describe('RemisionesDecisionComponent', () => {
  let component: RemisionesDecisionComponent;
  let fixture: ComponentFixture<RemisionesDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemisionesDecisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemisionesDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

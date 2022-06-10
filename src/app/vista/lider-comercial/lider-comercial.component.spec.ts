import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiderComercialComponent } from './lider-comercial.component';

describe('LiderComercialComponent', () => {
  let component: LiderComercialComponent;
  let fixture: ComponentFixture<LiderComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiderComercialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiderComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrrogaComponent } from './prorroga.component';

describe('ProrrogaComponent', () => {
  let component: ProrrogaComponent;
  let fixture: ComponentFixture<ProrrogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProrrogaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProrrogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

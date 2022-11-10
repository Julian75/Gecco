import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColillaTerceroLoteriaComponent } from './colilla-tercero-loteria.component';

describe('ColillaTerceroLoteriaComponent', () => {
  let component: ColillaTerceroLoteriaComponent;
  let fixture: ComponentFixture<ColillaTerceroLoteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColillaTerceroLoteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColillaTerceroLoteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

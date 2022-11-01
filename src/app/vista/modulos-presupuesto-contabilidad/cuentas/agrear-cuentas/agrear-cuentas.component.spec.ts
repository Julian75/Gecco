import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrearCuentasComponent } from './agrear-cuentas.component';

describe('AgrearCuentasComponent', () => {
  let component: AgrearCuentasComponent;
  let fixture: ComponentFixture<AgrearCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrearCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrearCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

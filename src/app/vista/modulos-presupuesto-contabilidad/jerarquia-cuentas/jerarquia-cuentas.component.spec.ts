import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerarquiaCuentasComponent } from './jerarquia-cuentas.component';

describe('JerarquiaCuentasComponent', () => {
  let component: JerarquiaCuentasComponent;
  let fixture: ComponentFixture<JerarquiaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerarquiaCuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerarquiaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

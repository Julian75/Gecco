import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJerarquiaComponent } from './agregar-jerarquia.component';

describe('AgregarJerarquiaComponent', () => {
  let component: AgregarJerarquiaComponent;
  let fixture: ComponentFixture<AgregarJerarquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarJerarquiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarJerarquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

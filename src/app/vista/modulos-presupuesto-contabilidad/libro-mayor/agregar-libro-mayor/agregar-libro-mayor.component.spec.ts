import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLibroMayorComponent } from './agregar-libro-mayor.component';

describe('AgregarLibroMayorComponent', () => {
  let component: AgregarLibroMayorComponent;
  let fixture: ComponentFixture<AgregarLibroMayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarLibroMayorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarLibroMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

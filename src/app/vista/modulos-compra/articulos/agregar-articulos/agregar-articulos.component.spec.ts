import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArticulosComponent } from './agregar-articulos.component';

describe('AgregarArticulosComponent', () => {
  let component: AgregarArticulosComponent;
  let fixture: ComponentFixture<AgregarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

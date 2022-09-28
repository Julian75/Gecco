import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArticulosModalComponent } from './agregar-articulos-modal.component';

describe('AgregarArticulosModalComponent', () => {
  let component: AgregarArticulosModalComponent;
  let fixture: ComponentFixture<AgregarArticulosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarArticulosModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarArticulosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

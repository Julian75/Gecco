import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSedesComponent } from './agregar-sedes.component';

describe('AgregarSedesComponent', () => {
  let component: AgregarSedesComponent;
  let fixture: ComponentFixture<AgregarSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSedesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

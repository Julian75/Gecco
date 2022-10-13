import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMediosRadiacionComponent } from './agregar-medios-radiacion.component';

describe('AgregarMediosRadiacionComponent', () => {
  let component: AgregarMediosRadiacionComponent;
  let fixture: ComponentFixture<AgregarMediosRadiacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMediosRadiacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMediosRadiacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

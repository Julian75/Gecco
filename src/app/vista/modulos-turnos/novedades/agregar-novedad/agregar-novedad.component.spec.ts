import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNovedadComponent } from './agregar-novedad.component';

describe('AgregarNovedadComponent', () => {
  let component: AgregarNovedadComponent;
  let fixture: ComponentFixture<AgregarNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarNovedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

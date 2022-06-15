import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAccesosComponent } from './agregar-accesos.component';

describe('AgregarAccesosComponent', () => {
  let component: AgregarAccesosComponent;
  let fixture: ComponentFixture<AgregarAccesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAccesosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

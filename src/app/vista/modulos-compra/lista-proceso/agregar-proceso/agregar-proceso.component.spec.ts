import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProcesoComponent } from './agregar-proceso.component';

describe('AgregarProcesoComponent', () => {
  let component: AgregarProcesoComponent;
  let fixture: ComponentFixture<AgregarProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

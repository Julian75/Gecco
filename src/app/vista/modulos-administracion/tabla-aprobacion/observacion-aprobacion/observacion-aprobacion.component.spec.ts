import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionAprobacionComponent } from './observacion-aprobacion.component';

describe('ObservacionAprobacionComponent', () => {
  let component: ObservacionAprobacionComponent;
  let fixture: ComponentFixture<ObservacionAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacionAprobacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservacionAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

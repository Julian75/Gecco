import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudConformeComponent } from './solicitud-conforme.component';

describe('SolicitudConformeComponent', () => {
  let component: SolicitudConformeComponent;
  let fixture: ComponentFixture<SolicitudConformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudConformeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudConformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazoSolicitudComponent } from './rechazo-solicitud.component';

describe('RechazoSolicitudComponent', () => {
  let component: RechazoSolicitudComponent;
  let fixture: ComponentFixture<RechazoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazoSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

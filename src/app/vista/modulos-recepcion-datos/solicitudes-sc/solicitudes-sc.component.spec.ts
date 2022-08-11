import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesScComponent } from './solicitudes-sc.component';

describe('SolicitudesScComponent', () => {
  let component: SolicitudesScComponent;
  let fixture: ComponentFixture<SolicitudesScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

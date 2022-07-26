import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionRegistroComponent } from './aprobacion-registro.component';

describe('AprobacionRegistroComponent', () => {
  let component: AprobacionRegistroComponent;
  let fixture: ComponentFixture<AprobacionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobacionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

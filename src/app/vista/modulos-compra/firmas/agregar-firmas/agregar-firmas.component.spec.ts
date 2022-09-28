import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFirmasComponent } from './agregar-firmas.component';

describe('AgregarFirmasComponent', () => {
  let component: AgregarFirmasComponent;
  let fixture: ComponentFixture<AgregarFirmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarFirmasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarFirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

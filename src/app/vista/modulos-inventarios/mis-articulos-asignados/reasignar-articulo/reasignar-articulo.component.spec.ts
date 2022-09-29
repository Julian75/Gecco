import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarArticuloComponent } from './reasignar-articulo.component';

describe('ReasignarArticuloComponent', () => {
  let component: ReasignarArticuloComponent;
  let fixture: ComponentFixture<ReasignarArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasignarArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasignarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisArticulosAsignadosComponent } from './mis-articulos-asignados.component';

describe('MisArticulosAsignadosComponent', () => {
  let component: MisArticulosAsignadosComponent;
  let fixture: ComponentFixture<MisArticulosAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisArticulosAsignadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisArticulosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

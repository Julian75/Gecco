import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClienteScComponent } from './agregar-cliente-sc.component';

describe('AgregarClienteScComponent', () => {
  let component: AgregarClienteScComponent;
  let fixture: ComponentFixture<AgregarClienteScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarClienteScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarClienteScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

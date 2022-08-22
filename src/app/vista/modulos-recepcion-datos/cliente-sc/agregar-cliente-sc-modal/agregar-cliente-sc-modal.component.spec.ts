import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClienteScModalComponent } from './agregar-cliente-sc-modal.component';

describe('AgregarClienteScModalComponent', () => {
  let component: AgregarClienteScModalComponent;
  let fixture: ComponentFixture<AgregarClienteScModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarClienteScModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarClienteScModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuditoriasActivosComponent } from './modal-auditorias-activos.component';

describe('ModalAuditoriasActivosComponent', () => {
  let component: ModalAuditoriasActivosComponent;
  let fixture: ComponentFixture<ModalAuditoriasActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAuditoriasActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAuditoriasActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

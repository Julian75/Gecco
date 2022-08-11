import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarClienteScComponent } from './modificar-cliente-sc.component';

describe('ModificarClienteScComponent', () => {
  let component: ModificarClienteScComponent;
  let fixture: ComponentFixture<ModificarClienteScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarClienteScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarClienteScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

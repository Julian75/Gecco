import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAreaComponent } from './modificar-area.component';

describe('ModificarAreaComponent', () => {
  let component: ModificarAreaComponent;
  let fixture: ComponentFixture<ModificarAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

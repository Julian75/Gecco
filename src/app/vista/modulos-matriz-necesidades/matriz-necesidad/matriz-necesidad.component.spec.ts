import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizNecesidadComponent } from './matriz-necesidad.component';

describe('MatrizNecesidadComponent', () => {
  let component: MatrizNecesidadComponent;
  let fixture: ComponentFixture<MatrizNecesidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizNecesidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrizNecesidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

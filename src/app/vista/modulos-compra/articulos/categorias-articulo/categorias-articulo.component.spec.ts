import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasArticuloComponent } from './categorias-articulo.component';

describe('CategoriasArticuloComponent', () => {
  let component: CategoriasArticuloComponent;
  let fixture: ComponentFixture<CategoriasArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

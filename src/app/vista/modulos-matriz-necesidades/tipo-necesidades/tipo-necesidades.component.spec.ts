import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoNecesidadesComponent } from './tipo-necesidades.component';

describe('TipoNecesidadesComponent', () => {
  let component: TipoNecesidadesComponent;
  let fixture: ComponentFixture<TipoNecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoNecesidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoNecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

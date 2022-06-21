import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoNovedadesComponent } from './tipo-novedades.component';

describe('TipoNovedadesComponent', () => {
  let component: TipoNovedadesComponent;
  let fixture: ComponentFixture<TipoNovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoNovedadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

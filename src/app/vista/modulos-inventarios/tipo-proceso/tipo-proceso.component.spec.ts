import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProcesoComponent } from './tipo-proceso.component';

describe('TipoProcesoComponent', () => {
  let component: TipoProcesoComponent;
  let fixture: ComponentFixture<TipoProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProcesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

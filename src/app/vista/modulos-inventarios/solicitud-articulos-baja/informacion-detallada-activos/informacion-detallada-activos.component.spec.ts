import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDetalladaActivosComponent } from './informacion-detallada-activos.component';

describe('InformacionDetalladaActivosComponent', () => {
  let component: InformacionDetalladaActivosComponent;
  let fixture: ComponentFixture<InformacionDetalladaActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionDetalladaActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionDetalladaActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

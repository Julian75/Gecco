import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosSolicitudComponent } from './comentarios-solicitud.component';

describe('ComentariosSolicitudComponent', () => {
  let component: ComentariosSolicitudComponent;
  let fixture: ComponentFixture<ComentariosSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarComentarioComponent } from './aprobar-comentario.component';

describe('AprobarComentarioComponent', () => {
  let component: AprobarComentarioComponent;
  let fixture: ComponentFixture<AprobarComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarComentarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobarComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

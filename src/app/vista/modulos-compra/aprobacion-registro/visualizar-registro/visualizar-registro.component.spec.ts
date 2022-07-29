import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarRegistroComponent } from './visualizar-registro.component';

describe('VisualizarRegistroComponent', () => {
  let component: VisualizarRegistroComponent;
  let fixture: ComponentFixture<VisualizarRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

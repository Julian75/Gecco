import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAprobacionComponent } from './tabla-aprobacion.component';

describe('TablaAprobacionComponent', () => {
  let component: TablaAprobacionComponent;
  let fixture: ComponentFixture<TablaAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAprobacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

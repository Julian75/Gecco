import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConfiguracionComponent } from './tabla-configuracion.component';

describe('TablaConfiguracionComponent', () => {
  let component: TablaConfiguracionComponent;
  let fixture: ComponentFixture<TablaConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaConfiguracionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarRegistroComponent } from './rechazar-registro.component';

describe('RechazarRegistroComponent', () => {
  let component: RechazarRegistroComponent;
  let fixture: ComponentFixture<RechazarRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazarRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechazarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

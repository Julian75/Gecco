import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaControlInternoComponent } from './auditoria-control-interno.component';

describe('AuditoriaControlInternoComponent', () => {
  let component: AuditoriaControlInternoComponent;
  let fixture: ComponentFixture<AuditoriaControlInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditoriaControlInternoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditoriaControlInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

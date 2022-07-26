import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspaListoComponent } from './raspa-listo.component';

describe('RaspaListoComponent', () => {
  let component: RaspaListoComponent;
  let fixture: ComponentFixture<RaspaListoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaspaListoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaspaListoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallasCierreComponent } from './mallas-cierre.component';

describe('MallasCierreComponent', () => {
  let component: MallasCierreComponent;
  let fixture: ComponentFixture<MallasCierreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MallasCierreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MallasCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

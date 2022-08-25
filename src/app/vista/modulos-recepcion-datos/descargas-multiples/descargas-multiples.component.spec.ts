import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargasMultiplesComponent } from './descargas-multiples.component';

describe('DescargasMultiplesComponent', () => {
  let component: DescargasMultiplesComponent;
  let fixture: ComponentFixture<DescargasMultiplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargasMultiplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargasMultiplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

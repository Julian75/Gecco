import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMovilComponent } from './side-movil.component';

describe('SideMovilComponent', () => {
  let component: SideMovilComponent;
  let fixture: ComponentFixture<SideMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMovilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

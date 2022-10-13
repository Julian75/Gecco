import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMediosRadiacionComponent } from './lista-medios-radiacion.component';

describe('ListaMediosRadiacionComponent', () => {
  let component: ListaMediosRadiacionComponent;
  let fixture: ComponentFixture<ListaMediosRadiacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMediosRadiacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMediosRadiacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

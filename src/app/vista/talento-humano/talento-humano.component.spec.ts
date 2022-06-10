import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentoHumanoComponent } from './talento-humano.component';

describe('TalentoHumanoComponent', () => {
  let component: TalentoHumanoComponent;
  let fixture: ComponentFixture<TalentoHumanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentoHumanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentoHumanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

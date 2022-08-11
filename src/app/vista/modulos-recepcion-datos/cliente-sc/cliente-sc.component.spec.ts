import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteScComponent } from './cliente-sc.component';

describe('ClienteScComponent', () => {
  let component: ClienteScComponent;
  let fixture: ComponentFixture<ClienteScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

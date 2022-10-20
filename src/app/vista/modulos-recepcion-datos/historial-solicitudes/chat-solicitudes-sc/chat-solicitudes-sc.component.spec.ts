import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSolicitudesScComponent } from './chat-solicitudes-sc.component';

describe('ChatSolicitudesScComponent', () => {
  let component: ChatSolicitudesScComponent;
  let fixture: ComponentFixture<ChatSolicitudesScComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSolicitudesScComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSolicitudesScComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

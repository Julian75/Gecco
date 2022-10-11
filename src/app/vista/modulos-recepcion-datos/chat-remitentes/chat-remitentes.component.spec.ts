import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRemitentesComponent } from './chat-remitentes.component';

describe('ChatRemitentesComponent', () => {
  let component: ChatRemitentesComponent;
  let fixture: ComponentFixture<ChatRemitentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRemitentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatRemitentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

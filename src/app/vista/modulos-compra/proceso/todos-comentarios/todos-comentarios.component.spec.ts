import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComentariosComponent } from './todos-comentarios.component';

describe('TodosComentariosComponent', () => {
  let component: TodosComentariosComponent;
  let fixture: ComponentFixture<TodosComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosComentariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

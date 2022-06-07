import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentReplyComponent } from './create-comment-reply.component';

describe('CreateCommentReplyComponent', () => {
  let component: CreateCommentReplyComponent;
  let fixture: ComponentFixture<CreateCommentReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommentReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCommentComponent } from './sort-comment.component';

describe('SortCommentComponent', () => {
  let component: SortCommentComponent;
  let fixture: ComponentFixture<SortCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

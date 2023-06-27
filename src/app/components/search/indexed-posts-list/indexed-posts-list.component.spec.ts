import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedPostsListComponent } from './indexed-posts-list.component';

describe('IndexedPostsListComponent', () => {
  let component: IndexedPostsListComponent;
  let fixture: ComponentFixture<IndexedPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexedPostsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

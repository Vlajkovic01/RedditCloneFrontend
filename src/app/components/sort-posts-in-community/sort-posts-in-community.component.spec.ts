import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortPostsInCommunityComponent } from './sort-posts-in-community.component';

describe('SortPostsInCommunityComponent', () => {
  let component: SortPostsInCommunityComponent;
  let fixture: ComponentFixture<SortPostsInCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortPostsInCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortPostsInCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortPostsComponent } from './sort-posts.component';

describe('SortPostsComponent', () => {
  let component: SortPostsComponent;
  let fixture: ComponentFixture<SortPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

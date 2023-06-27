import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedPostItemComponent } from './indexed-post-item.component';

describe('IndexedPostItemComponent', () => {
  let component: IndexedPostItemComponent;
  let fixture: ComponentFixture<IndexedPostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexedPostItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

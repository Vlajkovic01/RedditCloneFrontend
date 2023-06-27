import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedCommunityItemComponent } from './indexed-community-item.component';

describe('IndexedCommunityItemComponent', () => {
  let component: IndexedCommunityItemComponent;
  let fixture: ComponentFixture<IndexedCommunityItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexedCommunityItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedCommunityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

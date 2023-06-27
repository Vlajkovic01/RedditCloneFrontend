import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexedCommunitiesListComponent } from './indexed-communities-list.component';

describe('IndexedCommunitiesListComponent', () => {
  let component: IndexedCommunitiesListComponent;
  let fixture: ComponentFixture<IndexedCommunitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexedCommunitiesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexedCommunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

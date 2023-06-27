import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchCommunityComponent } from './input-search-community.component';

describe('InputSearchCommunityComponent', () => {
  let component: InputSearchCommunityComponent;
  let fixture: ComponentFixture<InputSearchCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearchCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

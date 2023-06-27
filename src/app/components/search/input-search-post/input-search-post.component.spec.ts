import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchPostComponent } from './input-search-post.component';

describe('InputSearchPostComponent', () => {
  let component: InputSearchPostComponent;
  let fixture: ComponentFixture<InputSearchPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearchPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

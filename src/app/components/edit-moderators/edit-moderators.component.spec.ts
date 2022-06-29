import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeratorsComponent } from './edit-moderators.component';

describe('EditModeratorsComponent', () => {
  let component: EditModeratorsComponent;
  let fixture: ComponentFixture<EditModeratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModeratorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModeratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

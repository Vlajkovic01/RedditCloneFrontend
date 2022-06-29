import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannedUsersComponent } from './edit-banned-users.component';

describe('EditBannedUsersComponent', () => {
  let component: EditBannedUsersComponent;
  let fixture: ComponentFixture<EditBannedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBannedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBannedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

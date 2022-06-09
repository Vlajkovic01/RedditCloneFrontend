import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {UserForMyProfileDTO} from "../../model/dto/user/UserForMyProfileDTO";
import {UserService} from "../../service/user/user.service";
import {UserForEditDTO} from "../../model/dto/user/UserForEditDTO";
import {User} from "../../model/User.model";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Input()
  user:UserForMyProfileDTO = new UserForMyProfileDTO();
  @Output()
  newUserEvent = new EventEmitter<UserForMyProfileDTO>();

  file: File | undefined;

  submitted = false;

  editProfileForm = this.fb.group({
    description: ["", [
      Validators.maxLength(200)
    ]],
    displayName: ["", [
      Validators.maxLength(20)
    ]],
    avatar: [""]
  })

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.editProfileForm.patchValue(
      {description: this.user.description, displayName: this.user.displayName}
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editProfileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProfileForm.invalid) {
      return;
    }


    if (this.file) {
      this.userService.saveImage(this.file).subscribe((image:string) => {
        let editedUser = this.editUser()
        editedUser.avatar = environment.imagePathForAvatar + image;
        this.userService.editUser(editedUser).subscribe((user:UserForMyProfileDTO) => {
          this.newUserEvent.emit(user);
          this.onReset();
        });
      });
    } else {
      this.userService.editUser(this.editUser()).subscribe((user:UserForMyProfileDTO)=>{
        this.newUserEvent.emit(user);
        this.onReset();
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.editProfileForm.reset()
  }

  editUser() {
    let editedUser = new UserForEditDTO();

    editedUser.description = this.editProfileForm.value.description;
    editedUser.displayName = this.editProfileForm.value.displayName;

    return editedUser;
  }

  uploadFile(event: any) {

    // @ts-ignore
    this.file = (event.target as HTMLInputElement).files[0];

    // @ts-ignore
    this.createPostForm.get('avatar').updateValueAndValidity()
  }

}

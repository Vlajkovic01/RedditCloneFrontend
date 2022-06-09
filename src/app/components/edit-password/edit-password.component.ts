import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {UserEditPasswordDTO} from "../../model/dto/user/UserEditPasswordDTO";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {Route, Router} from "@angular/router";
import {User} from "../../model/User.model";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  submitted = false;
  forbidden = false

  editPasswordForm = this.fb.group({
    currentPassword: ["", [
      Validators.required
    ]],
    newPassword: ["", [
      Validators.required,
      Validators.minLength(5)
    ]],
    confirmPassword: ["", [Validators.required
    ]]
  }, {
    validator: this.MustMatch('newPassword', 'confirmPassword')
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editPasswordForm.invalid) {
      return;
    }

    this.userService.editPassword(this.editPassword()).subscribe(()=>{
      this.authService.logout();
    }, (error) => {
      this.forbidden = true;
      console.log("nije")
    })
  }

  onReset() {
    this.submitted = false;
    this.forbidden = false;
    this.editPasswordForm.reset()
  }

  editPassword() {
    let userEditedPassword = new UserEditPasswordDTO();
    userEditedPassword.currentPassword = this.editPasswordForm.value.currentPassword;
    userEditedPassword.newPassword = this.editPasswordForm.value.newPassword;
    return userEditedPassword;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}

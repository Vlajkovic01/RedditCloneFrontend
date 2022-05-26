import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/User.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  forbidden = false;
  registerForm = this.fb.group({
    username: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]],
    password: ["", [
      Validators.required,
      Validators.minLength(5)
    ]],
    confirmPassword: ["", [Validators.required
    ]],
    email: ["", [Validators.required,
      Validators.email
    ]]
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.register(this.registerForm.value.username, this.registerForm.value.password, this.registerForm.value.email).subscribe(()=>{
      this.router.navigate(["/login"])
    }, (error) => {
      this.forbidden = true;
    })
  }

  onReset() {
    this.submitted = false;
    this.forbidden = false;
    this.registerForm.reset()
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

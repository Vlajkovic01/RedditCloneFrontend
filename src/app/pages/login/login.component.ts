import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder , Validators} from "@angular/forms";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]],
    password: ["", [
      Validators.required,
      Validators.minLength(5),
    ]]
  } )

  submitted = false;
  forbidden = false;
  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((data)=>{
      this.router.navigate(["/home"])
    }, (error) => {
      this.forbidden = true;
    })
  }

  onReset() {
    this.submitted = false;
    this.forbidden = false;
    this.loginForm.reset()
  }

}

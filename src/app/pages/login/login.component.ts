import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {AuthenticationService} from "../../security/authentication/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ["", [Validators.required, Validators.min(3)]],
    password: ["", [Validators.required, Validators.min(6)]]
  } )

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(data=>{
      // loggedIn?location.href="/home":this.loginForm.reset()
      location.href="/home"
    }, error => {
      this.loginForm.reset()
    })
  }

}

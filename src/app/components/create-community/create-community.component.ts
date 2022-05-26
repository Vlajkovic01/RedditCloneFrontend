import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {Router} from "@angular/router";
import {CommunityService} from "../../service/community/community.service";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {

  submitted = false;
  forbidden = false;
  createCommunityForm = this.fb.group({
    name: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],
    description: ["", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    flairs: ["", [Validators.required //TODO change to custom validate, if list.empty
    ]],
    rules: ["", [Validators.required //TODO change to custom validate, if list.empty
    ]]
  });

  constructor(private fb: FormBuilder,
              private communityService: CommunityService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.createCommunityForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.createCommunityForm.invalid) {
      return;
    }

    // this.communityService.create().subscribe(()=>{
    //   this.router.navigate(["/communities"])
    // }, (error) => {
    //   this.forbidden = true;
    // })
  }

  onReset() {
    this.submitted = false;
    this.forbidden = false;
    this.createCommunityForm.reset()
  }

}

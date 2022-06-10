import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditPasswordDTO} from "../../model/dto/user/UserEditPasswordDTO";
import {CommunityService} from "../../service/community/community.service";
import {Community} from "../../model/Community.model";
import {CommunitySuspendDTO} from "../../model/dto/community/CommunitySuspendDTO";

@Component({
  selector: 'app-suspend-community',
  templateUrl: './suspend-community.component.html',
  styleUrls: ['./suspend-community.component.css']
})
export class SuspendCommunityComponent implements OnInit {

  submitted = false;
  communityId:number = 0;

  suspendCommunityForm = this.fb.group({
    reason: ["", [
      Validators.required,
      Validators.minLength(5)
    ]]
  });

  constructor(private fb: FormBuilder,
              private communityService:CommunityService,
              private authService: AuthenticationService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.communityId = params['id'];
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.suspendCommunityForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.suspendCommunityForm.invalid) {
      return;
    }

    this.communityService.suspendCommunity(this.communityId, this.createSuspendReason()).subscribe(()=>{
      this.router.navigate(['/communities']);
    }, (error) => {
      alert("Try again later.")
    })
  }

  onReset() {
    this.submitted = false;
    this.suspendCommunityForm.reset()
  }

  createSuspendReason() {
    let newReason = new CommunitySuspendDTO();
    newReason.suspendedReason = this.suspendCommunityForm.value.reason;
    return newReason;
  }
}

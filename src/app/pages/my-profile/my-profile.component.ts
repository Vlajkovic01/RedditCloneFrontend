import { Component, OnInit } from '@angular/core';
import {User} from "../../model/User.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Community} from "../../model/Community.model";
import {UserService} from "../../service/user/user.service";
import {UserForMyProfileDTO} from "../../model/dto/user/UserForMyProfileDTO";
import {AuthenticationService} from "../../security/authentication/authentication.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user:UserForMyProfileDTO = new UserForMyProfileDTO();
  showEditProfile:boolean = false;
  showEditPassword:boolean = false
  username:string = ""

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private router:Router,
              private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getUser(this.username).subscribe((user:UserForMyProfileDTO) => {
        this.user = user
      }, (error) => {
        this.router.navigate(['/home'])
      })
    })
    console.log(this.amILoggedUser())
  }

  onShowEditProfile() {
    this.showEditProfile = !this.showEditProfile;
  }

  onShowEditPassword() {
    this.showEditPassword = !this.showEditPassword;
  }

  addEditedUser(editedUser: UserForMyProfileDTO) {
    this.user = editedUser;
  }

  amILoggedUser():boolean {
    return this.username === this.authService.getUsernameFromLoggedUser();
  }
}

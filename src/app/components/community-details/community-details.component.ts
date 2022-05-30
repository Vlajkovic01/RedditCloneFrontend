import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Community} from "../../model/Community.model";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {Observable} from "rxjs";
import {Moderator} from "../../model/Moderator.model";
import {JwtUtilsService} from "../../security/authentication/jwt-utils.service";

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  @Input()
  community: Community = new Community();

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isModerator(moderators:Moderator[]): boolean {
    return this.authService.isModerator(moderators);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}

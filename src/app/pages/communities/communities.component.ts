import { Component, OnInit } from '@angular/core';
import {Community} from "../../model/Community.model";
import {CommunityService} from "../../service/community/community.service";
import {AuthenticationService} from "../../security/authentication/authentication.service";

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent implements OnInit {

  communities: Community[] = []

  constructor(private communityService:CommunityService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.communityService.getAll().subscribe((communities:Community[]) => {
      this.communities = communities
    })
  }

  hasLoggedIn() {
    return this.authService.hasLoggedIn();
  }

}

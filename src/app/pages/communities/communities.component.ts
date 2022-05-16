import { Component, OnInit } from '@angular/core';
import {Community} from "../../model/Community.model";
import {CommunityService} from "../../service/community/community.service";

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.css']
})
export class CommunitiesComponent implements OnInit {

  communities: Community[] = []

  constructor(private communityService:CommunityService) { }

  ngOnInit(): void {
    this.communityService.getAll().subscribe((communities:Community[]) => {
      this.communities = communities
    })
  }

}

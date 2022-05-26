import { Component, OnInit } from '@angular/core';
import {CommunityService} from "../../service/community/community.service";
import {Post} from "../../model/Post.model";
import {Community} from "../../model/Community.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  community: Community = new Community();

  constructor(private communityService: CommunityService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const communityId = params['id'];
      this.communityService.getSingleCommunity(communityId).subscribe((community:Community) => {
        this.community = community
      })
    })

  }

}

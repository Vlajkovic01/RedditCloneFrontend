import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommunityService} from "../../service/community/community.service";
import {Community} from "../../model/Community.model";

@Component({
  selector: 'app-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.css']
})
export class CommunitiesListComponent implements OnInit {

  @Input()
  communities: Community[] = []

  constructor(private router:Router,
              private communityService:CommunityService) {
  }

  ngOnInit(): void {

  }

}

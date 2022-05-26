import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Community} from "../../model/Community.model";

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  @Input()
  community: Community = new Community();

  constructor() { }

  ngOnInit(): void {
  }

}

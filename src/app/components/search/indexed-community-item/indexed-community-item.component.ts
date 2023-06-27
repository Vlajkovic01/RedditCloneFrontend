import {Component, Input, OnInit} from '@angular/core';
import {Community} from "../../../model/Community.model";
import {CommunitySearchResponseDTO} from "../../../model/dto/community/CommunitySearchResponseDTO";

@Component({
  selector: 'app-indexed-community-item',
  templateUrl: './indexed-community-item.component.html',
  styleUrls: ['./indexed-community-item.component.css']
})
export class IndexedCommunityItemComponent implements OnInit {
  @Input()
  community: CommunitySearchResponseDTO = new CommunitySearchResponseDTO()
  constructor() { }

  ngOnInit(): void {
  }

}

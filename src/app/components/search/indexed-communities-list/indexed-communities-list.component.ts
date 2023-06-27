import {Component, Input, OnInit} from '@angular/core';
import {Community} from "../../../model/Community.model";
import {CommunitySearchResponseDTO} from "../../../model/dto/community/CommunitySearchResponseDTO";

@Component({
  selector: 'app-indexed-communities-list',
  templateUrl: './indexed-communities-list.component.html',
  styleUrls: ['./indexed-communities-list.component.css']
})
export class IndexedCommunitiesListComponent implements OnInit {
  @Input()
  communities: CommunitySearchResponseDTO[] = []
  constructor() { }

  ngOnInit(): void {
  }

}

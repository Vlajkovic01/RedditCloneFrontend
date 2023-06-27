import {Component, Input, OnInit} from '@angular/core';
import {CommunitySearchResponseDTO} from "../../../model/dto/community/CommunitySearchResponseDTO";
import {PostSearchResponseDTO} from "../../../model/dto/post/PostSearchResponseDTO";

@Component({
  selector: 'app-indexed-posts-list',
  templateUrl: './indexed-posts-list.component.html',
  styleUrls: ['./indexed-posts-list.component.css']
})
export class IndexedPostsListComponent implements OnInit {
  @Input()
  posts: PostSearchResponseDTO[] = []
  constructor() { }

  ngOnInit(): void {
  }

}

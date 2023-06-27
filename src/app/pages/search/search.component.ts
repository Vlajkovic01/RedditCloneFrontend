import {Component, Input, OnInit} from '@angular/core';
import {CommunitySearchResponseDTO} from "../../model/dto/community/CommunitySearchResponseDTO";
import {PostSearchResponseDTO} from "../../model/dto/post/PostSearchResponseDTO";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()
  communities: CommunitySearchResponseDTO[] = []
  posts: PostSearchResponseDTO[] = []
  constructor() { }

  showSearchCommunity: boolean = false;
  showSearchPost: boolean = false;

  ngOnInit(): void {
  }

  onChangeShowSearchCommunity() {
    this.showSearchCommunity = !this.showSearchCommunity;
  }

  onChangeShowSearchPost() {
    this.showSearchPost = !this.showSearchPost;
  }

  updateCommunities(response: CommunitySearchResponseDTO[]) {
    this.communities = response;
    this.showSearchCommunity = !this.showSearchCommunity
  }

  updatePosts(response: PostSearchResponseDTO[]) {
    this.posts = response;
    this.showSearchPost = !this.showSearchPost
  }

}

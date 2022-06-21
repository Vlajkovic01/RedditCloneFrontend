import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../model/Post.model";
import {PostService} from "../../service/post/post.service";
import {Community} from "../../model/Community.model";

@Component({
  selector: 'app-sort-posts-in-community',
  templateUrl: './sort-posts-in-community.component.html',
  styleUrls: ['./sort-posts-in-community.component.css']
})
export class SortPostsInCommunityComponent implements OnInit {

  @Input() community:Community = new Community();
  @Output()
  sortPostsEvent = new EventEmitter<Post[]>();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  newSort() {
    this.postService.newSortInCommunity(this.community.id).subscribe((posts:Post[])=>{
      this.sortPostsEvent.emit(posts);
    }, (error) => {
      console.log("error")
    })
  }

  topSort() {
    this.postService.topSortInCommunity(this.community.id).subscribe((posts:Post[])=>{
      this.sortPostsEvent.emit(posts);
    }, (error) => {
      console.log("error")
    })
  }

  hotSort() {
    this.postService.hotSortInCommunity(this.community.id).subscribe((posts:Post[])=>{
      this.sortPostsEvent.emit(posts);
    }, (error) => {
      console.log("error")
    })
  }

}

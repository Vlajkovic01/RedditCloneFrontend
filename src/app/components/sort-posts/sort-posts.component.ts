import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Comment} from "../../model/Comment.model";
import {Post} from "../../model/Post.model";
import {PostService} from "../../service/post/post.service";

@Component({
  selector: 'app-sort-posts',
  templateUrl: './sort-posts.component.html',
  styleUrls: ['./sort-posts.component.css']
})
export class SortPostsComponent implements OnInit {

  @Output()
  sortPostsEvent = new EventEmitter<Post[]>();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  newSort() {
    this.postService.newSort().subscribe((posts:Post[])=>{
      this.sortPostsEvent.emit(posts);
    }, (error) => {
      console.log("error")
    })
  }

  topSort() {
    this.postService.topSort().subscribe((posts:Post[])=>{
      this.sortPostsEvent.emit(posts);
    }, (error) => {
      console.log("error")
    })
  }

  hotSort() {
    this.postService.hotSort().subscribe((posts:Post[])=>{
      this.sortPostsEvent.emit(posts);
    }, (error) => {
      console.log("error")
    })
  }
}

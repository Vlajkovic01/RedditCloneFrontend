import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../model/Post.model";
import {PostService} from "../../service/post/post.service";
import {Comment} from "../../model/Comment.model";
import {CommentService} from "../../service/comment/comment.service";

@Component({
  selector: 'app-sort-comment',
  templateUrl: './sort-comment.component.html',
  styleUrls: ['./sort-comment.component.css']
})
export class SortCommentComponent implements OnInit {

  @Input()
  post:Post = new Post();
  @Output()
  sortCommentEvent = new EventEmitter<Comment[]>();

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  newSort() {
    this.commentService.newSort(this.post.id).subscribe((comments:Comment[])=>{
      this.sortCommentEvent.emit(comments);
    }, (error) => {
      console.log("error")
    })
  }

  topSort() {
    this.commentService.topSort(this.post.id).subscribe((comments:Comment[])=>{
      this.sortCommentEvent.emit(comments);
    }, (error) => {
      console.log("error")
    })
  }

  oldSort() {
    this.commentService.oldSort(this.post.id).subscribe((comments:Comment[])=>{
      this.sortCommentEvent.emit(comments);
    }, (error) => {
      console.log("error")
    })
  }
}

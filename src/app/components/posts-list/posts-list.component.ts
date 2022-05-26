import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Router} from "@angular/router";
import {PostService} from "../../service/post/post.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  @Input()
  posts: Post[] = []

  constructor(private router:Router,
              private postService:PostService) {
  }

  ngOnInit(): void {
  }

}

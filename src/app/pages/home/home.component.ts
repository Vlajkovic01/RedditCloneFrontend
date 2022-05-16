import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../service/post/post.service";
import {Observable} from "rxjs";
import {Post} from "../../model/Post.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  posts: Post[] = []

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((posts:Post[]) => {
      this.posts = posts
    })
  }
}

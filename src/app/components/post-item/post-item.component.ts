import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input()
  post: Post = new Post()

  constructor(private router:Router) {

  }

  ngOnInit(): void {
  }

  showCommunity(postId:number){
    this.router.navigate(['/communities/:id',]); //TODO implement to find a community by post id
  }

  showPostDetails(postId:number) {
    this.router.navigate(['/communities/:id/posts/:id']) //TODO implement to find a post(all the details)
  }

}

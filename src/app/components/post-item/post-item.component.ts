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
  @Input()
  showCommunityButton: boolean = true;

  constructor(private router:Router) {

  }

  ngOnInit(): void {
    console.log(this.post)
  }

}

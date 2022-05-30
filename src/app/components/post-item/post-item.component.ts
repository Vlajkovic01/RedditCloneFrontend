import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Router} from "@angular/router";
import {ReactionType} from "../../model/enum/ReactionType.enum";

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

  calculateKarma(): number {
    let karma: number = 0;

    for (let reaction of this.post.reactions) {
      if (reaction.type.toString() === ReactionType[ReactionType.UPVOTE]) {
        karma++
      }
      if (reaction.type.toString() === ReactionType[ReactionType.DOWNVOTE]) {
        karma--;
      }
    }
    return karma;
  }

}

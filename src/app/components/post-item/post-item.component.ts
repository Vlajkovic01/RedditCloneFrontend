import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Router} from "@angular/router";
import {ReactionType} from "../../model/enum/ReactionType.enum";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {ReactionService} from "../../service/reaction/reaction.service";
import {ReactionCreateDTO} from "../../model/dto/reaction/ReactionCreateDTO";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input()
  post: Post = new Post()

  reactedToPost: boolean = false; //validation

  constructor(private router:Router,
              private authService: AuthenticationService,
              private reactionService: ReactionService) {

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

  upvotePost() {
    if (!this.reacted()) {
      let newReaction = new ReactionCreateDTO();
      newReaction.type = ReactionType[ReactionType.UPVOTE];
      newReaction.postId = this.post.id;
      this.reactionService.create(newReaction).subscribe(()=>{
        this.reactedToPost = true;
      }, (error) => {

        if (this.reactedToPost) {
          alert("You already reacted to this post.")
        } else {
          alert("You must be logged in.")
        }

      })
    } else {
      alert("You already reacted to this post.")
    }
  }

  downvotePost() {
    if (!this.reacted()) {
      let newReaction = new ReactionCreateDTO();
      newReaction.type = ReactionType[ReactionType.DOWNVOTE];
      newReaction.postId = this.post.id;
      this.reactionService.create(newReaction).subscribe(()=>{

        if (this.reactedToPost) {
          alert("You already reacted to this post.")
        } else {
          alert("You must be logged in.")
        }

      }, (error) => {
        alert("You must be logged in.")
      })
    } else {
      alert("You already reacted to this post.")
    }
  }

  reacted():boolean {
    for (let reaction of this.post.reactions) {
      if (reaction.user.username === this.authService.getUsernameFromLoggedUser()) {
        return true;
      }
    }
    return false;
  }

}

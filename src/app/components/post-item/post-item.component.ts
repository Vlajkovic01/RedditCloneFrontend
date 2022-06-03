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

  reactedUpvoteToPost: boolean = false; //validation
  reactedDownvoteToPost: boolean = false;
  upvoteHover: boolean = false;
  downvoteHover: boolean = false;

  constructor(private router:Router,
              private authService: AuthenticationService,
              private reactionService: ReactionService) {

  }

  ngOnInit(): void {
    this.hoverBtnIfReacted();
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
      if (reaction.type === ReactionType.UPVOTE) {
        karma++;
      }
      if (reaction.type === ReactionType.DOWNVOTE) {
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
        this.reactedUpvoteToPost = true;
        this.upvoteHover = true;
      }, (error) => {

        if (this.reactedUpvoteToPost || this.reactedDownvoteToPost) {
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
        this.reactedDownvoteToPost = true;
        this.downvoteHover = true;
      }, (error) => {
        if (this.reactedUpvoteToPost || this.reactedDownvoteToPost) {
          alert("You already reacted to this post.")
        } else {
          alert("You must be logged in.")
        }
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

  hoverBtnIfReacted() {
    for (let reaction of this.post.reactions) {
      if (reaction.user.username === this.authService.getUsernameFromLoggedUser()) {
        if (reaction.type.toString() === ReactionType[ReactionType.UPVOTE]) {
          this.upvoteHover = true;
        }
        if (reaction.type.toString() === ReactionType[ReactionType.DOWNVOTE]) {
          this.downvoteHover = true;
        }
        if (reaction.type === ReactionType.UPVOTE) {
          this.upvoteHover = true;
        }
        if (reaction.type === ReactionType.DOWNVOTE) {
          this.downvoteHover =true;
        }
      }
    }
  }

}

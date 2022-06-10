import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../model/Comment.model";
import {ReactionType} from "../../model/enum/ReactionType.enum";
import {Moderator} from "../../model/Moderator.model";
import {ReactionCreateDTO} from "../../model/dto/reaction/ReactionCreateDTO";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {ReactionService} from "../../service/reaction/reaction.service";
import {Reaction} from "../../model/Reaction.model";

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment:Comment = new Comment();

  reactedUpvoteToComment: boolean = false; //validation
  reactedDownvoteToComment: boolean = false;
  upvoteHover:boolean = false;
  downvoteHover:boolean = false;
  showCreateCommentReply:boolean = false

  constructor(private authService: AuthenticationService,
              private reactionService: ReactionService) { }

  ngOnInit(): void {
    this.hoverBtnIfReacted();
  }

  isModerator(moderators:Moderator[]): boolean {
    return this.authService.isModerator(moderators);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  hasLoggedIn() {
    return this.authService.hasLoggedIn();
  }

  calculateKarma(): number {
    let karma: number = 0;

    for (let reaction of this.comment.reactions) {
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

  upvoteComment() {
    if (!this.reacted()) {
      let newReaction = new ReactionCreateDTO();
      newReaction.type = ReactionType[ReactionType.UPVOTE];
      newReaction.commentId = this.comment.id;
      this.reactionService.create(newReaction).subscribe(()=>{
        this.reactedUpvoteToComment = true;
        this.upvoteHover = true;
      }, (error) => {
        if (this.reactedUpvoteToComment || this.reactedDownvoteToComment) {
          alert("You already reacted to this post.")
        } else {
          alert("You must be logged in.")
        }

      })
    } else {
      alert("You already reacted to this post.")
    }
  }

  downvoteComment() {
    if (!this.reacted()) {
      let newReaction = new ReactionCreateDTO();
      newReaction.type = ReactionType[ReactionType.DOWNVOTE];
      newReaction.commentId = this.comment.id;
      this.reactionService.create(newReaction).subscribe(()=>{
        this.reactedDownvoteToComment = true;
        this.downvoteHover = true;
      }, (error) => {
        if (this.reactedUpvoteToComment || this.reactedDownvoteToComment) {
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
    for (let reaction of this.comment.reactions) {
      if (reaction.user.username === this.authService.getUsernameFromLoggedUser()) {
        return true;
      }
    }
    return false;
  }

  hoverBtnIfReacted() {
    for (let reaction of this.comment.reactions) {
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
          this.downvoteHover = true;
        }
      }
    }
  }

  onShowCreateCommentReply() {
    this.showCreateCommentReply = !this.showCreateCommentReply;
  }

  addNewComment(newComment:Comment) {
    let newReaction = new Reaction(0, ReactionType.UPVOTE, new Date(), newComment.user, null, newComment);
    newComment.reactions.push(newReaction);

    this.comment.children.push(newComment);
    this.showCreateCommentReply = false;
  }

}

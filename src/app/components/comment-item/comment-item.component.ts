import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../model/Comment.model";
import {ReactionType} from "../../model/enum/ReactionType.enum";
import {Moderator} from "../../model/Moderator.model";
import {ReactionCreateDTO} from "../../model/dto/reaction/ReactionCreateDTO";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {ReactionService} from "../../service/reaction/reaction.service";
import {Reaction} from "../../model/Reaction.model";
import {Community} from "../../model/Community.model";
import {BannedCreateDTO} from "../../model/dto/banned/BannedCreateDTO";
import {BannedService} from "../../service/banned/banned.service";
import {Banned} from "../../model/Banned.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment:Comment = new Comment();
  @Input() community:Community = new Community();

  upvoteHover:boolean = false;
  downvoteHover:boolean = false;
  showCreateCommentReply:boolean = false
  showCreateCommentReport:boolean = false
  bans:Banned[] = []
  karma:number = 0
  clickedBtn:string = ""

  constructor(private authService: AuthenticationService,
              private reactionService: ReactionService,
              private bannedService: BannedService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.calculateKarma();
    this.hoverBtnIfReacted();

    this.route.params.subscribe(params => {
      const communityId = params['idCommunity'];
      this.bannedService.getAllByCommunity(communityId).subscribe((bans:Banned[]) => {
        this.bans = bans;
      })
    })
  }

  isModerator(): boolean {
    return this.authService.isModerator(this.community.moderators);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isBanned():boolean {
    return this.authService.isBanned(this.bans)
  }

  hasLoggedIn() {
    return this.authService.hasLoggedIn();
  }

  calculateKarma() {
    for (let reaction of this.comment.reactions) {
      if (reaction.type.toString() === ReactionType[ReactionType.UPVOTE] || reaction.type === ReactionType.UPVOTE) {
        this.karma++
      }
      if (reaction.type.toString() === ReactionType[ReactionType.DOWNVOTE] || reaction.type === ReactionType.DOWNVOTE) {
        this.karma--;
      }
    }
  }

  upvoteComment() {
    this.clickedBtn = "UPVOTE";
    if (!this.reacted()) {
      if (!this.isBanned()) {
        let newReaction = new ReactionCreateDTO();
        newReaction.type = ReactionType[ReactionType.UPVOTE];
        newReaction.commentId = this.comment.id;
        this.reactionService.create(newReaction).subscribe((reaction)=>{
          this.comment.reactions.push(reaction)
          this.karma++;
          this.upvoteHover = true;
        }, (error) => {
          console.log(error)
        })
      } else {
        alert("You are banned from this community.")
      }
    } else {
      this.undoReaction();
    }
  }

  downvoteComment() {
    this.clickedBtn = "DOWNVOTE";
    if (!this.reacted()) {
      if (!this.isBanned()) {
        let newReaction = new ReactionCreateDTO();
        newReaction.type = ReactionType[ReactionType.DOWNVOTE];
        newReaction.commentId = this.comment.id;
        this.reactionService.create(newReaction).subscribe((reaction)=>{
          this.comment.reactions.push(reaction)
          this.karma--;
          this.downvoteHover = true;
        }, (error) => {
          console.log(error)
        })
      } else {
        alert("You are banned from this community.")
      }
    } else {
      this.undoReaction();
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

  onShowCreateCommentReport() {
    this.showCreateCommentReport = !this.showCreateCommentReport;
  }

  addNewComment(newComment:Comment) {
    let newReaction = new Reaction(0, ReactionType.UPVOTE, new Date(), newComment.user, null, newComment);
    newComment.reactions.push(newReaction);

    this.comment.children.push(newComment);
    this.showCreateCommentReply = false;
  }

  banUser() {
    let newBan = new BannedCreateDTO();
    newBan.userId = this.comment.user.id;
    newBan.communityId = this.community.id;

    this.bannedService.create(newBan).subscribe(() => {
      alert("Successfully banned.")
    }, (error) => {
      alert("User is already banned in this community.")
    })
  }

  undoReaction() {
    if (confirm("You already reacted to this comment.Do you want to change the reaction?")) {
      for (let reaction of this.comment.reactions) {
        if (reaction.user.username === this.authService.getUsernameFromLoggedUser()) {

          this.reactionService.delete(reaction.id).subscribe((removedReaction) => {

            const index = this.comment.reactions.findIndex(reaction => reaction.id === removedReaction.id);
            if (index > -1) {
              this.comment.reactions.splice(index,1);
            }

            if (removedReaction.type.toString() === ReactionType[ReactionType.UPVOTE] || removedReaction.type === ReactionType.UPVOTE) {
              this.upvoteHover = false;
              this.karma--;
              if (this.clickedBtn !== "UPVOTE") {
                this.downvoteComment();
              }
            }
            if (removedReaction.type.toString() === ReactionType[ReactionType.DOWNVOTE] || removedReaction.type === ReactionType.DOWNVOTE){
              this.downvoteHover = false;
              this.karma++;
              if (this.clickedBtn !== "DOWNVOTE") {
                this.upvoteComment();
              }
            }
          })
        }
      }
    }
  }
}

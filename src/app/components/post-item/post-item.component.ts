import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ReactionType} from "../../model/enum/ReactionType.enum";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {ReactionService} from "../../service/reaction/reaction.service";
import {ReactionCreateDTO} from "../../model/dto/reaction/ReactionCreateDTO";
import {Banned} from "../../model/Banned.model";
import {BannedService} from "../../service/banned/banned.service";
import {Reaction} from "../../model/Reaction.model";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input()
  post: Post = new Post()

  upvoteHover: boolean = false;
  downvoteHover: boolean = false;
  bans:Banned[] = []
  karma:number = 0
  clickedBtn:string = ""

  constructor(private router:Router,
              private authService: AuthenticationService,
              private reactionService: ReactionService,
              private route:ActivatedRoute,
              private bannedService:BannedService) {

  }

  ngOnInit(): void {
    this.calculateKarma();
    this.hoverBtnIfReacted();

    if (this.post.community) {
      this.bannedService.getAllByCommunity(this.post.community.id).subscribe((bans:Banned[]) => {
        this.bans = bans;
      })
    } else {
      this.route.params.subscribe(params => {
        const communityId = params['id'];
        this.bannedService.getAllByCommunity(communityId).subscribe((bans:Banned[]) => {
          this.bans = bans;
        })
      })
    }

  }

  isBanned():boolean {
    return this.authService.isBanned(this.bans)
  }

  calculateKarma() {
    for (let reaction of this.post.reactions) {
      if (reaction.type.toString() === ReactionType[ReactionType.UPVOTE] || reaction.type === ReactionType.UPVOTE) {
        this.karma++
      }
      if (reaction.type.toString() === ReactionType[ReactionType.DOWNVOTE] || reaction.type === ReactionType.DOWNVOTE) {
        this.karma--;
      }
    }
  }

  upvotePost() {
    this.clickedBtn = "UPVOTE";
    if (!this.reacted()) {
      if (!this.isBanned()) {
        let newReaction = new ReactionCreateDTO();
        newReaction.type = ReactionType[ReactionType.UPVOTE];
        newReaction.postId = this.post.id;
        this.reactionService.create(newReaction).subscribe((reaction)=>{
          this.post.reactions.push(reaction);
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

  downvotePost() {
    this.clickedBtn = "DOWNVOTE";
    if (!this.reacted()) {
      if (!this.isBanned()) {
        let newReaction = new ReactionCreateDTO();
        newReaction.type = ReactionType[ReactionType.DOWNVOTE];
        newReaction.postId = this.post.id;
        this.reactionService.create(newReaction).subscribe((reaction)=>{
          this.post.reactions.push(reaction);
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

  undoReaction() {
    if (confirm("You already reacted to this post.Do you want to change the reaction?")) {
      for (let reaction of this.post.reactions) {
        if (reaction.user.username === this.authService.getUsernameFromLoggedUser()) {

          this.reactionService.delete(reaction.id).subscribe((removedReaction) => {

            const index = this.post.reactions.findIndex(reaction => reaction.id === removedReaction.id);
            if (index > -1) {
              this.post.reactions.splice(index,1);
            }

            if (removedReaction.type.toString() === ReactionType[ReactionType.UPVOTE] || removedReaction.type === ReactionType.UPVOTE) {
              this.upvoteHover = false;
              this.karma--;
              if (this.clickedBtn !== "UPVOTE") {
                this.downvotePost();
              }
            }
            if (removedReaction.type.toString() === ReactionType[ReactionType.DOWNVOTE] || removedReaction.type === ReactionType.DOWNVOTE){
              this.downvoteHover = false;
              this.karma++;
              if (this.clickedBtn !== "DOWNVOTE") {
                this.upvotePost();
              }
            }
          })
        }
      }
    }
  }
}

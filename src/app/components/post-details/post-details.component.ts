import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Moderator} from "../../model/Moderator.model";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {Community} from "../../model/Community.model";
import {ReactionType} from "../../model/enum/ReactionType.enum";
import {ReactionCreateDTO} from "../../model/dto/reaction/ReactionCreateDTO";
import {ReactionService} from "../../service/reaction/reaction.service";
import {PostService} from "../../service/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Reaction} from "../../model/Reaction.model";
import {Comment} from "../../model/Comment.model";
import {BannedCreateDTO} from "../../model/dto/banned/BannedCreateDTO";
import {BannedService} from "../../service/banned/banned.service";
import {Banned} from "../../model/Banned.model";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  @Input()
  post:Post = new Post();
  @Input()
  community:Community = new Community();

  reactedUpvoteToPost: boolean = false; //validation
  reactedDownvoteToPost: boolean = false;
  upvote: ReactionType = ReactionType.UPVOTE
  downvote: ReactionType = ReactionType.DOWNVOTE
  upvoteHover = false
  downvoteHover = false
  showCreateComment:boolean = false
  showEditPost:boolean = false
  showReportPost:boolean = false
  bans:Banned[] = []
  karma:number = 0
  clickedBtn:string = ""

  constructor(private authService: AuthenticationService,
              private reactionService: ReactionService,
              private postService: PostService,
              private bannedService: BannedService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {

    setTimeout(()=>{ //???
      this.calculateKarma();
    },500)

    this.route.params.subscribe(params => {
      const communityId = params['idCommunity'];
      this.bannedService.getAllByCommunity(communityId).subscribe((bans:Banned[]) => {
        this.bans = bans;
      })
    })
  }

  isModerator(moderators:Moderator[]): boolean {
    return this.authService.isModerator(moderators);
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

  hoverBtnIfReacted(type:ReactionType):boolean {
    for (let reaction of this.post.reactions) {
      if (reaction.user.username === this.authService.getUsernameFromLoggedUser()) {
        if (reaction.type.toString() === ReactionType[type]) {
          return true;
        }
      }
    }
    return false;
  }

  deletePost() {
    this.postService.delete(this.community.id, this.post.id).subscribe(() => {
      this.router.navigate([`/communities/${this.community.id}`])
    }, (error) => {
      console.log(error)
    })
  }

  onShowCreateComment(){
    this.showCreateComment = !this.showCreateComment;
  }

  onShowEditPost() {
    this.showEditPost = !this.showEditPost;
  }

  onShowReportPost() {
    this.showReportPost = !this.showReportPost;
  }

  addNewComment(newComment:Comment) {
    let newReaction = new Reaction(0, ReactionType.UPVOTE, new Date(), newComment.user, null, newComment);
    newComment.reactions.push(newReaction);

    this.post.comments.push(newComment);
    this.showCreateComment = false;
  }

  amIPostCreator() {
    return this.post.user.username === this.authService.getUsernameFromLoggedUser();
  }

  addEditedPost(editedPost:Post) {
    this.post = editedPost;
    this.showEditPost = false;
  }

  sortComments(comments:Comment[]) {
    this.post.comments = comments;
  }

  banUser() {
    let newBan = new BannedCreateDTO();
    newBan.userId = this.post.user.id;
    newBan.communityId = this.community.id;

    this.bannedService.create(newBan).subscribe(() => {
      alert("Successfully banned.")
    }, (error) => {
      alert("User is already banned in this community.")
    })
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

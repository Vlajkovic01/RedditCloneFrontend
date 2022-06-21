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

  constructor(private authService: AuthenticationService,
              private reactionService: ReactionService,
              private postService: PostService,
              private router:Router) { }

  ngOnInit(): void {
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
    this.showEditPost = !this.showEditPost
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
}

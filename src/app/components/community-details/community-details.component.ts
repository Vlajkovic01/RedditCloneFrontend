import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Community} from "../../model/Community.model";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {Moderator} from "../../model/Moderator.model";
import {Reaction} from "../../model/Reaction.model";
import {ReactionType} from "../../model/enum/ReactionType.enum";

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  @Input()
  community: Community = new Community();

  showCreatePost:boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  isModerator(moderators: Moderator[]): boolean {
    return this.authService.isModerator(moderators);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  hasLoggedIn() {
    return this.authService.hasLoggedIn();
  }

  onShowCreatePost(){
    this.showCreatePost = !this.showCreatePost;
  }

  addNewPost(newPost:Post) {
    let newReaction = new Reaction(0, ReactionType.UPVOTE, new Date(), newPost.user, newPost, null);
    newPost.reactions.push(newReaction);

    this.community.posts.push(newPost);
  }
}

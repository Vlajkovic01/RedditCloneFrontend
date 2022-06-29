import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../model/Post.model";
import {Community} from "../../model/Community.model";
import {AuthenticationService} from "../../security/authentication/authentication.service";
import {Moderator} from "../../model/Moderator.model";
import {Reaction} from "../../model/Reaction.model";
import {ReactionType} from "../../model/enum/ReactionType.enum";
import {Banned} from "../../model/Banned.model";
import {BannedService} from "../../service/banned/banned.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css']
})
export class CommunityDetailsComponent implements OnInit {

  @Input()
  community: Community = new Community();

  showCreatePost:boolean = false;
  showSuspendCommunity:boolean = false;
  showEditCommunity:boolean = false;
  showReviewReports:boolean = false;
  showEditModerators:boolean = false;
  bans:Banned[] = []

  constructor(private authService: AuthenticationService,
              private bannedService: BannedService,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const communityId = params['id'];
      this.bannedService.getAllByCommunity(communityId).subscribe((bans:Banned[]) => {
        this.bans = bans;
      })
    })
  }

  isModerator(moderators: Moderator[]): boolean {
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

  onShowCreatePost(){
    this.showCreatePost = !this.showCreatePost;
  }

  onShowSuspendCommunity() {
    this.showSuspendCommunity = !this.showSuspendCommunity;
  }

  onShowEditCommunity() {
    this.showEditCommunity = !this.showEditCommunity;
  }

  onShowReviewReports() {
    this.showReviewReports = !this.showReviewReports;
  }

  onShowEditModerators() {
    this.showEditModerators = !this.showEditModerators;
  }

  addNewPost(newPost:Post) {
    let newReaction = new Reaction(0, ReactionType.UPVOTE, new Date(), newPost.user, newPost, null);
    newPost.reactions.push(newReaction);

    this.community.posts.push(newPost);
    this.showCreatePost = false;
  }

  removeReportedPost(postForRemove:Post) {
    const index = this.community.posts.findIndex(post => post.id === postForRemove.id);
    if (index > -1) {
      this.community.posts.splice(index,1);
    }
  }

  addNewCommunity(editedCommunity:Community) {
    this.community = editedCommunity;
    this.showEditCommunity = false;
  }

  sortPosts(posts:Post[]) {
    this.community.posts = posts;
  }
}

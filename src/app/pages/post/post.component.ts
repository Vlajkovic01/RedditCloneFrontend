import { Component, OnInit } from '@angular/core';
import {Post} from "../../model/Post.model";
import {PostService} from "../../service/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Community} from "../../model/Community.model";
import {CommunityService} from "../../service/community/community.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post:Post = new Post();
  community:Community = new Community();

  constructor(private postService: PostService,
              private communityService: CommunityService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const communityId = params['idCommunity']
      const postId = params['idPost'];

      this.postService.getPostFromCommunity(communityId, postId).subscribe((post:Post) => {
        this.post = post;
      }, (error) => {
        this.router.navigate(['/home']);
      })

      this.communityService.getSingleCommunity(communityId).subscribe((community:Community) => {
        this.community = community
      }, (error) => {
        this.router.navigate(['/home']);
      })
    })
  }

}

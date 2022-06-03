import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../model/Post.model";
import {environment} from "../../../environments/environment";
import {PostCreateDTO} from "../../model/dto/post/PostCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly postsPath = environment.path + "posts"
  private readonly communitiesPath = environment.path + "communities"

  constructor(private http:HttpClient) { }

  getAll():Observable<Post[]> {
    return this.http.get<Post[]>(this.postsPath);
  }

  getPostFromCommunity(idCommunity:number, idPost:number):Observable<Post> {
    return this.http.get<Post>(this.communitiesPath + `/${idCommunity}` + `/posts/${idPost}`)
  }

  create(post:PostCreateDTO, communityId: number) {
    return this.http.post<Post>(this.communitiesPath + `/${communityId}` + "/posts", post);
  }

}

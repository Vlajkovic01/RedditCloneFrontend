import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../model/Post.model";
import {environment} from "../../../environments/environment";
import {PostCreateDTO} from "../../model/dto/post/PostCreateDTO";
import {PostEditDTO} from "../../model/dto/post/PostEditDTO";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly postsPath = environment.path + "posts"
  private readonly communitiesPath = environment.path + "communities"
  private readonly uploadImagePath = environment.path + "upload/posts/image"

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

  edit(post:PostEditDTO, idCommunity: number, idPost:number) {
    return this.http.put<Post>(this.communitiesPath+ `/${idCommunity}/posts/${idPost}`, post);
  }

  delete(communityId: number, postId:number) {
    return this.http.delete(this.communitiesPath + `/${communityId}/posts/${postId}`)
  }

  saveImage(file: any):Observable<string> {
    let formData = new FormData();
    formData.append("image", file);
    return this.http.post<string>(this.uploadImagePath, formData);
  }

  newSort():Observable<Post[]> {
    return this.http.get<Post[]>(this.postsPath + "/new");
  }

  newSortInCommunity(id:number):Observable<Post[]> {
    return this.http.get<Post[]>(this.communitiesPath + `/${id}/posts/new`);
  }

  topSort():Observable<Post[]> {
    return this.http.get<Post[]>(this.postsPath + "/top");
  }

  topSortInCommunity(id:number):Observable<Post[]> {
    return this.http.get<Post[]>(this.communitiesPath + `/${id}/posts/top`);
  }

  hotSort():Observable<Post[]> {
    return this.http.get<Post[]>(this.postsPath + "/hot");
  }

  hotSortInCommunity(id:number):Observable<Post[]> {
    return this.http.get<Post[]>(this.communitiesPath + `/${id}/posts/hot`);
  }

}

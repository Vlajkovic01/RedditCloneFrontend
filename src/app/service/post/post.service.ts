import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../model/Post.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly postsPath = environment.path + "posts"
  private readonly getPostFromCommunityPath = environment.path + "communities"

  constructor(private http:HttpClient) { }

  getAll():Observable<Post[]> {
    return this.http.get<Post[]>(this.postsPath);
  }

  getPostFromCommunity(idCommunity:number, idPost:number):Observable<Post> {
    return this.http.get<Post>(this.getPostFromCommunityPath + `/${idCommunity}` + `/posts/${idPost}`)
  }

}

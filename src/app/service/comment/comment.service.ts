import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommentCreateDTO} from "../../model/dto/comment/CommentCreateDTO";
import {Comment} from "../../model/Comment.model";
import {Observable} from "rxjs";
import {Post} from "../../model/Post.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly commentsPath = environment.path + "comments"

  constructor(private http:HttpClient) { }

  create(comment:CommentCreateDTO) {
    return this.http.post<Comment>(this.commentsPath, comment);
  }

  newSort(id:number):Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsPath + `/post/${id}/new`);
  }

  topSort(id:number):Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsPath + `/post/${id}/top`);
  }

  oldSort(id:number):Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsPath + `/post/${id}/old`);
  }
}

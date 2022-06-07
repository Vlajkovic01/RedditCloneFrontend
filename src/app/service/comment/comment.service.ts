import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommentCreateDTO} from "../../model/dto/comment/CommentCreateDTO";
import {Comment} from "../../model/Comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly commentsPath = environment.path + "comments"

  constructor(private http:HttpClient) { }

  create(comment:CommentCreateDTO) {
    return this.http.post<Comment>(this.commentsPath, comment);
  }
}

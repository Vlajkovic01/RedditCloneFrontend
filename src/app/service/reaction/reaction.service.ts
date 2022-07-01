import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ReactionCreateDTO} from "../../model/dto/reaction/ReactionCreateDTO";
import {Reaction} from "../../model/Reaction.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  private readonly reactionsPath = environment.path + "reactions"

  constructor(private http:HttpClient) { }

  create(reaction:ReactionCreateDTO):Observable<Reaction> {
    return this.http.post<Reaction>(this.reactionsPath, reaction);
  }

  delete(reactionId: number):Observable<Reaction> {
    return this.http.delete<Reaction>(this.reactionsPath + `/${reactionId}`);
  }
}

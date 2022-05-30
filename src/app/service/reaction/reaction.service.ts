import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ReactionCreateDTO} from "../../model/dto/reaction/ReactionCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  private readonly reactionsPath = environment.path + "reactions"

  constructor(private http:HttpClient) { }

  create(reaction:ReactionCreateDTO) {
    return this.http.post(this.reactionsPath, reaction);
  }
}

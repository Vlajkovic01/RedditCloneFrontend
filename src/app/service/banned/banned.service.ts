import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BannedCreateDTO} from "../../model/dto/banned/BannedCreateDTO";
import {Observable} from "rxjs";
import {Banned} from "../../model/Banned.model";

@Injectable({
  providedIn: 'root'
})
export class BannedService {

  private readonly bannedPath = environment.path + "banned"

  constructor(private http:HttpClient) { }

  create(banned:BannedCreateDTO) {
    return this.http.post(this.bannedPath, banned);
  }

  getBannedByCommunityIdAndUsername(id:number, username:string):Observable<Banned> {
    return this.http.get<Banned>(this.bannedPath + `/community/${id}/user/${username}`);
  }

  getAllByCommunity(communityId:number):Observable<Banned[]> {
    return this.http.get<Banned[]>(this.bannedPath + `/community/${communityId}`);
  }
}

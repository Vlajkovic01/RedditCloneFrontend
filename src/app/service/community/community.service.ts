import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community} from "../../model/Community.model";
import {environment} from "../../../environments/environment";
import {CommunityCreateDTO} from "../../model/dto/community/CommunityCreateDTO";
import {CommunitySuspendDTO} from "../../model/dto/community/CommunitySuspendDTO";
import {CommunityEditDTO} from "../../model/dto/community/CommunityEditDTO";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private readonly communitiesPath = environment.path + "communities"

  constructor(private http:HttpClient) { }

  getAll():Observable<Community[]> {
    return this.http.get<Community[]>(this.communitiesPath);
  }

  getSingleCommunity(id:number):Observable<Community> {
    return this.http.get<Community>(this.communitiesPath + `/${id}` )
  }

  create(community:CommunityCreateDTO) {
    return this.http.post(this.communitiesPath, community);
  }

  suspendCommunity(id: number, reason:CommunitySuspendDTO) {
    return this.http.post(this.communitiesPath + `/${id}/suspend`, reason)
  }

  edit(community: CommunityEditDTO, id: number) {
    return this.http.put<Community>(this.communitiesPath + `/${id}`, community)
  }
}

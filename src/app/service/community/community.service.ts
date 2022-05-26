import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community} from "../../model/Community.model";
import {environment} from "../../../environments/environment";
import {CommunityCreateDTO} from "../../model/dto/community/CommunityCreateDTO";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private readonly communitiesPath = environment.path + "communities"

  constructor(private http:HttpClient) { }

  getAll():Observable<Community[]> {
    return this.http.get<Community[]>(this.communitiesPath);
  }

  create(community:CommunityCreateDTO) {
    return this.http.post(this.communitiesPath, community);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community} from "../../model/Community.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private readonly communitiesPath = environment.path + "communities"

  constructor(private http:HttpClient) { }

  getAll():Observable<Community[]> {
    return this.http.get<Community[]>(this.communitiesPath);
  }
}

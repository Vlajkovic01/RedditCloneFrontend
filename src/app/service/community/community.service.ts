import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Community} from "../../model/Community.model";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private readonly path = "http://localhost:8080/api/communities";

  constructor(private http:HttpClient) { }

  getAll():Observable<Community[]> {
    return this.http.get<Community[]>(this.path);
  }
}

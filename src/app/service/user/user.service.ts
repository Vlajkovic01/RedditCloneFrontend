import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../model/Post.model";
import {User} from "../../model/User.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly path = "http://localhost:8080/api/users";

  constructor(private http:HttpClient) {
  }

  getAll():Observable<User[]> {
    return this.http.get<User[]>(this.path);
  }
}

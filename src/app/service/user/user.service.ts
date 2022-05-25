import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../model/Post.model";
import {User} from "../../model/User.model";
import {environment} from "../../../environments/environment";
import {UserRegistrationDTO} from "../../model/dto/user/UserRegistrationDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersPath = environment.path + "users"

  constructor(private http:HttpClient) {
  }

  getAll():Observable<User[]> {
    return this.http.get<User[]>(this.usersPath);
  }

  register(username: string, password: string, email: string) {
    let newUser: UserRegistrationDTO = new UserRegistrationDTO();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email
    return this.http.post(this.usersPath, newUser)
  }
}
